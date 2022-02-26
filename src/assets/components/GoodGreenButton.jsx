import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addBookToShelf, removeBookFromShelf } from "../../redux/actions/shelfAction";
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/styles";

const GoodSelect = styled(Select)(() => ({
    height: "35px",
    paddingRight: "10px",
    fontSize: "0.8em",
    fontFamily: "Lato Bold",
    color: "white",
    background: "#409D69",
    "&:hover": {
        background: "#3d9363"
    }
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
    const shelves = useSelector(state => state.shelves);
    const userShelves = useSelector(state => state.shelves.userShelves);
    const dispatch = useDispatch();

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
        shelvesNames.push({ name: shelves[shelf].name, key: shelf })
    }


    const [choosenName, setChoosenName] = React.useState(shelvesNames[0].name);

    const handleChange = (event) => {
        let choosenShelf = event.target.value;
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