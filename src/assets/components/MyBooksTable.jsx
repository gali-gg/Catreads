import { useDispatch } from "react-redux";
import { authorManager } from "../../model/AuthorManagerService";
import GoodLink from "./GoodLink";
import MyBooksTableRow from "./MyBooksTableRow";
import "./styles.css";
import { removeBookFromShelf } from "../../redux/actions/shelfAction";

export default function MyBooksTable (props) {
    const dispatch = useDispatch();
    return (
        <div style={{minWidth: "900px", textAlign: "center"}}>
        {props.books.length > 0 ? (<table style={{width: "100%"}} className="text-left">
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
                    onRemove={() => {
                        if(props.shelfName === "All"){
                            dispatch(removeBookFromShelf(false, "Want to Read", book.uuid));
                            dispatch(removeBookFromShelf(false, "Currently Reading", book.uuid));
                            dispatch(removeBookFromShelf(false, "Read", book.uuid));
                        } else {
                            dispatch(removeBookFromShelf(false, props.shelfName, book.uuid));
                        }
                    }}
                ></MyBooksTableRow>

            })}
        </tbody>
    </table>) : (<p className="latoR grGrey">No results</p>)}
    </div>
    )
}