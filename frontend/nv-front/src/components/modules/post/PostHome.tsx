import Card from "../../common/Card"

export default function Post(posts: any) {
    return(
        <>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 mx-4 gap-4">{
                posts.posts?.results.map((data: any) => {
                    return(
                        <>
                        <Card key={data.id} post_data={data} />
                        </>
                    )
                })
            }</div>
        </>
    )
}