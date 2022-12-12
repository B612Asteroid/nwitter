import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbBase";
import { v4 as uuidv4 } from 'uuid';

const Home = ({ loginedUser }) => {

    const [ nweet, setNweet ] = useState("");
    const [ nweets, setNweets ] = useState([]);
    const [ attachment, setAttachment ] = useState();

    useEffect(() => {
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => {
                return {
                    id: doc.id, 
                    ...doc.data()
                }
            });
            setNweets(nweetArray);
        });
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        
        let attachmentUrl = "";
        if (attachment !== "") {
            const fileRef = storageService.ref().child(`${loginedUser.uid}/${uuidv4()}`);
            const response = await fileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: loginedUser.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    }

    const onChange = (event) => {
        const { target: { value }} = event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => {
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={ onSubmit }>
                <input type="text" placeholder="What's on your mind?" maxLength={120} value={ nweet } onChange={ onChange } />
                <input type="file" accept="image/*" onChange={ onFileChange } />
                {attachment && 
                    <div>
                        <img alt="" src={ attachment } width="50px" height="50px" />
                        <button onClick={ onClearAttachment }>Clear Image</button>
                    </div>  
                }
                <input type="submit" value="Nweet" />
            </form>

            <div>
                {
                    nweets.map(nweet => <Nweet key={ nweet.id } nweetObj={ nweet } isOwner={ nweet.creatorId === loginedUser.uid } />)
                }
            </div>
        </div> 
    )
}

export default Home;