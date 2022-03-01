import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { changeAvatarAction } from '../../redux/actions/userAction';
import "./css/styles.css";

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
    width: 150,
    height: 150,
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
    height: '100%',
};


export default function Previews(props) {
    const dispatch = useDispatch()
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            let formData = new FormData();
            formData.append("file", acceptedFiles[0]);
            formData.append("upload_preset", "goodreads_images");

            fetch(`https://api.cloudinary.com/v1_1/dsjpepzqk/image/upload`, {
                method: "POST",
                body: formData
            })
            .then(resp => resp.json())
            .then(data => {
                dispatch(changeAvatarAction(data.secure_url));
            });
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={URL.createObjectURL(file)}
                    style={img}
                    alt="thumbnail"
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files, props.isSubmit]);

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
