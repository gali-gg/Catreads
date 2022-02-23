import Title from "./Title";

export default function ProfileListEl(props) {
    return (
        <tr>
            <td>
                <Title title={props.title} className="latoB grBrown" />
            </td>
            <td colSpan={10}></td>
            <td>
                <span className="latoR grBrown f-09">{props.text}</span>
            </td>
        </tr>
    )
}