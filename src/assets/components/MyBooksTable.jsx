import { authorManager } from "../../model/AuthorManagerService";
import GoodLink from "./GoodLink";
import MyBooksTableRow from "./MyBooksTableRow";
import "./styles.css";

export default function MyBooksTable (props) {
    return (
        <>
        {props.books.length > 0 ? (<table className="text-left">
        <thead >
            <tr>
            <th>
                <GoodLink titleText="cover" classes="latoB grBrown"/>
            </th>
            <th>
                <GoodLink titleText="title" classes="latoB grBrown"/>
            </th>
            <th>
                <GoodLink titleText="author" classes="latoB grBrown"/>
            </th>
            <th>
                <GoodLink titleText="avg rating" classes="latoB grBrown text-left"/>
            </th>
            <th>
                <GoodLink titleText="rating" classes="latoB grBrown"/>
            </th>
            <th>
                <GoodLink titleText="shelves" classes="latoB grBrown"/>
            </th>
            <th>
                <GoodLink titleText="date read" classes="latoB grBrown"/>
            </th>
            <th>
                <GoodLink titleText="date added" classes="latoB grBrown"/>
            </th>
            <th>
            </th>
            <th>
            </th>
            </tr>
        </thead>
        <tbody>
        {props.books.map(book => {
                return <MyBooksTableRow key={book.uuid}
                    book={book}
                    authorName = {authorManager.getNameById(book.author)}
                    userRating = {Math.random()*6}
                    dateRead = "Feb 12, 2022"
                    dateAdded = "Feb 10, 2022"
                    shelves={["to-read", "best-books"]}
                ></MyBooksTableRow>

            })}
        </tbody>
    </table>) : (<p className="latoR grGrey">No results</p>)}
    </>
    )
}