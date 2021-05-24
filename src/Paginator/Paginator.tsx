export const Paginator = (props: {
                              arr: Array<any>,
                              postsPerPage: number,
                              totalPosts: number,
                              paginate: (n: number) => void
                          },
                          currentPage: number) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i)
    }

    console.log(pageNumbers)

    return (
        <nav>
            <ul>
                {pageNumbers.slice().map(n => (
                    <li key={n}>
                        <h1 onClick={() => props.paginate(n)}>
                            {n}
                        </h1>
                    </li>
                ))}
            </ul>
        </nav>)
}