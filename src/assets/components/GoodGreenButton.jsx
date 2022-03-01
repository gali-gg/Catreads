import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addBookToShelf, removeBookFromShelf } from "../../redux/actions/shelfAction";
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/styles";
import _ from "lodash";
import { addBookToShelfActivity } from "../../redux/actions/activitiesAction";

const GoodSelect = styled(Select)(() => ({
    height: "35px",
    paddingRight: "10px",
    fontSize: "0.8em",
    fontFamily: "Lato Bold",
    color: "white",
    background: "#409D69",
    "&:hover": {
        background: "#3d9363"
    },
    minWidth: "160px",
}));

const GoodMenuItem = styled(MenuItem)(() => ({
    margin: "0px",
    padding: "5px",
    fontSize: "0.8em",
    fontFamily: "Lato Regular",
    color: "black",
    "&:hover": {
        background: "#ddd"
    }
}));


export default function GoodGreenButton(props) {
    const shelves = useSelector(state => state.shelves, _.isEqual);
    const userShelves = useSelector(state => state.shelves.userShelves, _.isEqual);
    const dispatch = useDispatch();

    const [choosenName, setChoosenName] = React.useState("Add to shelf");

    const shelvesNames = [];
    let userShelvesNames = [];

    for (let shelf in shelves) {
        if (shelf === "userShelves") {
            if (userShelves.length > 0) {
                userShelvesNames = userShelves.map(userShelf => {
                    return { name: userShelf.name }
                });
            }
            continue;
        }

        shelvesNames.push({ name: shelves[shelf].name, key: shelf });
    }

    React.useEffect(() => {
        let shelfName = "Add to shelf";
        shelvesNames.forEach(shelf => {
            if(shelfName !== "Add to shelf"){
                return;
            }

            if(shelves[shelf.key].books.some(bookID => bookID === props.bookUuid)){
                shelfName = shelves[shelf.key].name;
            }
        });

        if(shelfName !== "Add to shelf"){
            setChoosenName(shelfName);
            return;
        }

        shelves.userShelves.forEach(shelf => {
            if(shelfName !== "Add to shelf"){
                return;
            }

            if(shelf.books.some(bookID => bookID === props.bookUuid)){
                shelfName = shelf.name;
            }
        });

        setChoosenName(shelfName);

    }, [shelves, userShelves, props.bookUuid]);

    const handleChange = (event) => {
        let choosenShelf = event.target.value;

        if(choosenShelf === "Add to shelf"){
            return;
        }

        let isUserShelf = false;
        setChoosenName(choosenShelf);

        if (userShelvesNames.some(userShelfName => userShelfName.name === choosenShelf)) {
            isUserShelf = true;
        }

        for (let shelf in shelves) {
            if (shelf === "userShelves") {
                continue;
            }
            if (!isUserShelf && shelves[shelf].books.some(book => book === props.bookUuid)) {
                dispatch(removeBookFromShelf(false, shelves[shelf].name, props.bookUuid))
            }
        }

        dispatch(addBookToShelf(isUserShelf, choosenShelf, props.bookUuid));
        dispatch(addBookToShelfActivity(choosenShelf, props.bookUuid));

    };


    return props.styled ? (
        <div>
            <FormControl >
                <GoodSelect
                    id="demo-simple-select"
                    value={choosenName}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <GoodMenuItem key="null-option" value="Add to shelf">
                        Add to shelf
                    </GoodMenuItem>
                    {shelvesNames.map(shelfName =>
                        <GoodMenuItem key={shelfName.name} value={shelfName.name}>
                            {shelfName.name}
                        </GoodMenuItem>
                    )}
                    {userShelvesNames.map((userShelfName) => (
                        <GoodMenuItem key={userShelfName.name} value={userShelfName.name}>
                            {userShelfName.name}
                        </GoodMenuItem>
                    ))}

                </GoodSelect>
            </FormControl>
        </div>
    ) : (
        <select value={choosenName} onChange={handleChange}>
            {shelvesNames.map(shelfName =>
                <option key={shelfName.name} value={shelfName.name}>
                    {shelfName.name}
                </option>
            )}
            {userShelvesNames.map((userShelfName) => (
                <option key={userShelfName.name} value={userShelfName.name}>
                    {userShelfName.name}
                </option>
            ))}
        </select>
    );
}