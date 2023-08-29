import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import {format, parseISO} from 'date-fns'

export default function Launches({launch, patch}) {

console.log(launch);

    const launches = launch.map((launch) => {
       let launchArray = {
        "key": launch.id,
        "image": launch.image,
        "vehicle": launch.rocket.configuration.name,
        "provider": launch.launch_service_provider.name,  
        "type": launch.launch_service_provider.type, 
        "location": launch.pad.location.name,
        "nextOpportunity": format(parseISO(launch.window_start),'MM-dd-yy h:mm aa'),
        "launchStatus": launch.status && launch.status.name ? launch.status.name : "No status available",
        "statusDescription": launch.status && launch.status.description ? launch.status.description : "No description available",
        "launchDescription": launch.mission && launch.mission.description ? launch.mission.description : "No description available",
         }
            return launchArray
        })

 


       
    return (
        <div key={uuidv4()} className='smoke'>
            <h1 className='display-5 text-center'>Upcoming Launches</h1>
            <p className='text-center fw-bold'>Next Launch on {launches[0].nextOpportunity}</p>
            <div className="row m-4" key={uuidv4()}>
           
                {launches.map((launch) => {
                    return (
                        <div className='col-xsm-12 col-md-6 col-lg-6 col-xl-6 pb-3' key={uuidv4()}>
                            <div className='card shadow-lg' key={uuidv4()}>
                                <div className="row">
                                    <div className="col-4">
                                <img src={launch.image} className='card-img-top fillImage' alt='rocket' key={uuidv4()}></img>
                                </div>
                                <div className="col-8">
                                <div className='card-body' key={uuidv4()}>
                                    <h5 className='card-title'>{launch.provider}</h5>
                                    <p className='card-text'>{launch.vehicle}</p>
                                    <p className='card-text'>Mission Type: {launch.type}</p>
                                    <p className='card-text'>Location: {launch.location}</p>
                                    <p className='card-text'>{launch.launchDescription}</p>
                                    <p className='fw-bold card-text'>Status: {launch.launchStatus}</p>
                                    <p className='card-text'>{launch.statusDescription}</p>
                                    <p className='card-text'>Launch window opens: {launch.nextOpportunity}</p>

                                </div></div></div>
                                
                               
                            </div>
                        </div>
                    )
                    
                }

                )}
                
            </div>
        </div>
    )
}

