import React from 'react';

const Images = ({ selectedMap, image }) => {
    const info = mapInfo(selectedMap);
    return (
        <div onDragStart={e => e.preventDefault()}>
            {(() => {
                const arr = [];
                for (let i = 0; i < 8; i++) {
                    for (let g = 0; g < 8; g++) {
                        arr.push(`${i},${g}`);
                    }
                }
                return arr;
            })().map(url => {
                return <img className={image} key={url} alt={url} src={`${info}/${url}.png`} />;
            })}
        </div>
    );
    function mapInfo(selectedMap) {
        const info = {
            cogmap1: `https://goonhub.com/images/maps/cogmap`,
            cogmap2: `https://goonhub.com/images/maps/cogmap2`,
            faintSignal: `https://goonhub.com/images/maps/cogmap2`,
            oshan: `https://goonhub.com/images/maps/oshan`,
            clarion: `https://goonhub.com/images/maps/clarion`,
            destiny: `https://goonhub.com/images/maps/destiny`,
            atlas: `https://goonhub.com/images/maps/atlas`,
            horizon: `https://goonhub.com/images/maps/horizon`,
            donut3: `https://raw.githubusercontent.com/j-awn/telescience/master/public/donut3`,
            mushroom: `https://raw.githubusercontent.com/j-awn/telescience/master/public/mushroom`,
            manta: `https://goonhub.com/images/maps/manta`,
            kondaru: `https://goonhub.com/images/maps/kondaru`,
            donut2: `https://goonhub.com/images/maps/donut2`,
            fleet: `https://goonhub.com/images/maps/bellerophon%20fleet`,
        };
        if (!info[selectedMap]) return info['cogmap1'];
        return info[selectedMap];
    }
};

export default Images;
