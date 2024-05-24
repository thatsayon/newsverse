import Card from "./Card"

export default function Post(posts: any) {
    return(
        <>
            <div>
                <h1 className="text-center">Post Page</h1>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 mx-4 gap-4">{
                posts.posts?.results.map((data: any) => {
                    return(
                        <>
                        <Card post_data={data} />
                        </>
                    )
                })
            }</div>
        </>
    )
}