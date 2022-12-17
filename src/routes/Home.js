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
    }, []);

    return (
        <div>
            <div>
                {
                    nweets.map(nweet => <Nweet key={ nweet.id } nweetObj={ nweet } isOwner={ nweet.creatorId === loginedUser.uid } />)
                }
            </div>
        </div> 
    )
}

export default Home;