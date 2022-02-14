import TextImageContainer from "./TextImageContainer";
import Title from "./Title";

export default function SideMenuImageEl(props){
    return(
        <>
            <Title title={props.bigTitle} color="#382110"></Title>
            <TextImageContainer 
                title={props.title} 
                imgSrc={props.imgSrc}
                subTitle={props.subTitle}
                color={props.color}
                width={props.width}
                direction={props.direction}
                textStaus={props.textStaus}
                imgHeight={props.imgHeight}
                imgWidth={props.imgWidth}
                subSubTitle={props.subSubTitle}
                button={props.button}
                status={props.status}
            />
        </>
    )
}