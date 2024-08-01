import Card from "../../common/Card";

interface PostProps {
    posts: any[];
}

const Post: React.FC<PostProps> = ({ posts }) => {
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-2 m-8 gap-4">
            {posts.map((data) => (
                <Card key={data.id} post_data={data} />
            ))}
        </div>
    );
};

export default Post;