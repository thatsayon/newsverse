from post.models import Post 
from bnlp import BengaliPOS
import re 
import langid
import spacy
import pycountry
import string 

# function to generate english topic list
def english_topics(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    # Extract named entities as topics
    entities = [ent.text for ent in doc.ents]

    # Extract significant words (e.g., nouns, proper nouns, adjectives) as potential topics
    keywords = [token.text for token in doc if token.is_alpha and token.pos_ in {'NOUN', 'PROPN', 'ADJ'} and not token.is_stop]

    # Combine entities and keywords, and filter unique topics
    topics = set(entities + keywords)
    
    # Function to check if a word is a country name
    def is_country(name):
        try:
            return pycountry.countries.lookup(name) is not None
        except LookupError:
            return False
    
    # Classify topics into categories
    countries = sorted([topic for topic in topics if is_country(topic)], key=str.lower)
    persons = sorted([ent.text for ent in doc.ents if ent.label_ == "PERSON"], key=str.lower)
    nouns = sorted([token.text for token in doc if token.pos_ == "NOUN" and token.text not in countries and not token.is_stop], key=str.lower)
    proper_nouns = sorted([token.text for token in doc if token.pos_ == "PROPN" and token.text not in countries and not token.is_stop], key=str.lower)
    
    # Combine the sorted categories
    sorted_topics = countries + persons + nouns + proper_nouns 
    
    sorted_topics = [topic for topic in sorted_topics if topic.isalpha()]

    return sorted_topics



# function to generate bangla topic list
def bangla_topics(text):
    bn_pos = BengaliPOS()
    res = bn_pos.tag(text)
    noun_tags_order = ['NP', 'NLOC', 'NC', 'DAB']
    punctuations = set(string.punctuation)
    bangla_punctuation = {'।', ',', '!', '?', '’', '‘', '-', '—', '“', '”', '(', ')', '[', ']', '{', '}', ':', ';', "'", '"'}
    punctuations.update(bangla_punctuation)
    common_suffixes = ['ে', 'ের', 'য়ে', 'তে', 'তে', 'র', 'রা', 'তে', 'েরই', 'দের', 'গুলো', 'গুলি', 'রই']

    def normalize_word(word):
        for suffix in common_suffixes:
            if word.endswith(suffix):
                return word[:-len(suffix)]
        return word
    
    np_words = []
    nloc_words = []
    nc_words = []
    dab_words = []

    for token, tag in res:
        if token not in punctuations:
            normalized_token = normalize_word(token)
            if tag == 'NP':
                np_words.append(normalized_token)
            elif tag == 'NLOC':
                nloc_words.append(normalized_token)
            elif tag == 'NC':
                nc_words.append(normalized_token)
            elif tag == 'DAB':
                dab_words.append(normalized_token)

    ordered_nouns = np_words + nloc_words + nc_words + dab_words

    return ordered_nouns


def add_post(title: str, content: str, thumbnail_url: str):
    existing_post = Post.objects.filter(title=title).exists()
    if existing_post: return 
    country_names = [country.name for country in pycountry.countries]
    country_alpha2 = [country.alpha_2 for country in pycountry.countries]

    country_pattern = re.compile(r'\b(?:' + '|'.join(re.escape(country) for country in country_names + country_alpha2) + r')\b')

    matches = country_pattern.findall(title)

    unique_matches = set(matches)

    result = []

    for match in unique_matches:
        if len(match) == 2:  # If it's an alpha_2 code
            country = pycountry.countries.get(alpha_2=match)
            if country:
                result.append(country.name)
        else:
            result.append(match)
    

    language = langid.classify(title)

    if language[0] == 'en': 
        res = english_topics(title)
        result.extend(res)
    elif language[0] == 'bn':
        res = bangla_topics(title)
        result.extend(res)

    result = list(set(result))

    
    # print(f"Title {title} \n Content {content} \n thumbnail_url {thumbnail_url} \n topics {result} \n language {language[0]}")
    post = Post.objects.create(title=title, content=content, thumbnail_url=thumbnail_url, topics=result, lang=language[0])
    post.save()

    
