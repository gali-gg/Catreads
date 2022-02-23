import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeAvatarAction } from '../../redux/actions/userAction';
import "./styles.css";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    border: "1px solif #ddd",
};

const dropzone = {
    border: "1px solid #ddd",
    background: "#eee",
    padding: "20px",
    cursor: "pointer",
    borderRadius: "3px"
}
const thumb = {
    margin: "auto",
    display: 'inline-flex',
    borderRadius: 2,
    paddingBottom: 8,
    paddingRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


export default function Previews(props) {
    const dispatch = useDispatch()
    const userAvatar = useSelector(state => state.userData.avatar);
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={URL.createObjectURL(file)}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        if(files.length > 0){
            dispatch(changeAvatarAction(URL.createObjectURL(files[0])));
        }
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        
        <section className="container">
            <div style={dropzone} {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <span className="latoB grBrown">Change profile picture</span>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}