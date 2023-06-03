import { TrackPreview } from "./track-preview";

export function TrackList({station}){
    return(
        <div className="track-list">
            <table>
                    <tr>
                        <td>
                           # 
                        </td>
                        <td>
                            Title
                        </td>
                        <td>
                            Album
                        </td>
                        <td>
                        <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path></svg>
                        </td>
                    </tr>
                {station.songs.map((track,idx) =>
                    <TrackPreview 
                    track ={track}
                    idx={idx}/>
                )
                }
                </table>
            </div >
    )
}