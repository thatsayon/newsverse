from post.models import Post 
import pycountry
import re 
import langid

def add_post(title: str, content: str, thumbnail_url: str):
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
    post = Post.objects.create(title=title, content=content, thumbnail_url=thumbnail_url, topics=result, lang=language[0])
    post.save()

    
