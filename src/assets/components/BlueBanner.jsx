import blueBanner from "../images/blue-banner.jpg";
import Stack from '@mui/material/Stack';


export default function BlueBanner(){
    return (
        <Stack 
            justifyContent="center" 
            alignItems="center" 
            sx={{
                bgcolor:"#B7BFFD", 
                cursor:"pointer"
            }}>
                <img height={40} src={blueBanner} alt="blue-banner" />
        </Stack>
    )
}