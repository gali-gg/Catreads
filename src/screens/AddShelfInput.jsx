import { useState } from "react";
import { useDispatch } from "react-redux";
import { addShelfActivity } from "../redux/actions/activitiesAction";
import { addShelf } from "../redux/actions/shelfAction";

export default function AddShelfInput (props) {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }

    const handleAddShelf = (event) => {
        event.preventDefault();
        let shelfName = inputValue.trim()
        if(shelfName){
            dispatch(addShelf(shelfName));
            dispatch(addShelfActivity(shelfName));
            setInputValue("");
        }
    }

    return (
        <div>
            <p>Add shelf:</p>
            <input type="text" value={inputValue} onInput={handleInput}/>
            <button onClick={handleAddShelf}>Add shelf</button>
        </div>
    );
}