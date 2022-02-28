import { useDispatch, useSelector } from "react-redux";
import GoodLink from "./GoodLink";
import MyBooksTableRow from "./MyBooksTableRow";
import "./css/styles.css";
import { removeBookFromShelf } from "../../redux/actions/shelfAction";

export default function MyBooksTable (props) {
    let userID = useSelector(state => state.userData.id);
    let authors = useSelector(state => state.authors.authors);

    const isUserShelf = props.isUserShelf;

    const shelves = {
        wantToRead: "Want to Read",
        currentlyReading: "Currently Reading",
        read: "Read"
    }

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
            </th>
            <th>
            </th>
            </tr>
        </thead>
        <tbody>
        {authors && props.books.map(book => {
                return <MyBooksTableRow key={book.uuid}
                    book={book}
                    authorName = {authors.find(author => author.uuid === book.author).name}
                    userID={userID}
                    shelves={["to-read", "best-books"]}
                    onRemove={() => {
                        console.log(isUserShelf, props.shelfName);
                        if(props.shelfName === "all"){
                            dispatch(removeBookFromShelf(false, "Want to Read", book.uuid));
                            dispatch(removeBookFromShelf(false, "Currently Reading", book.uuid));
                            dispatch(removeBookFromShelf(false, "Read", book.uuid));
                        } else {
                            dispatch(removeBookFromShelf(isUserShelf, shelves[props.shelfName] || props.shelfName, book.uuid));
                        }
                    }}
                ></MyBooksTableRow>

            })}
        </tbody>
    </table>) : (<p className="latoR grGrey">No results</p>)}
    </div>
    )
}