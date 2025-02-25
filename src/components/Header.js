import React from 'react';
export function Header(){
    const sectionStyle = {backgroundImage: 
        `url(${process.env.PUBLIC_URL+'/img/background.png'})`,
        height: "75vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };
    return(
        <header style={sectionStyle} className="d-flex flex-column justify-content-center text-light">
                <div className="p-2 flex-row align-self-center">
                    <h1>Trail Tales</h1>
                </div>
                <div className="p-2 flex-row align-self-center">
                    <p className="lead">Climb mountains, not so the world can see you, but so you can see the world</p>
                </div>
        </header>
    );
}

export default Header;