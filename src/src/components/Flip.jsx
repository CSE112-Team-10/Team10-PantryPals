import React, { useEffect, useState } from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';
import './Flip.css'; // Include your CSS here

function Flip ({}) {

    const [firstPhaseClick, setFirstPhaseClick] = useState(false);
    const [secondPhaseClick, setSecondPhaseClick] = useState(false);

    const handleFirstPhaseClick = () => {
        setFirstPhaseClick(true);
        setSecondPhaseClick(false);
    }

    const handleSecondPhaseClick = () => {
        setSecondPhaseClick(true);
        setFirstPhaseClick(false);
    }

    useEffect(() => {

        const item = document.querySelector(".flip-item");
        const itemImage = document.querySelector(".flip-image");
        const detail = document.querySelector(".flip-detail");

        const firstPhase = () => {

            item.style.opacity = 0
            detail.style.display = "block";

            let firstRectangle = itemImage.getBoundingClientRect();
            let lastRectangle = detail.getBoundingClientRect();

            detail.animate(
                [
                    {
                        transform: `
                            translateX(${firstRectangle.left - lastRectangle.left}px)
                            translateY(${firstRectangle.top - lastRectangle.top}px)
                            scale(${firstRectangle.width / lastRectangle.width})
                        `
                    },
                    {
                        transform: `
                            translateX(0)
                            translateY(0)
                            scale(1)
                        `
                    }
                ],
                {
                    duration: 1000,
                    easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
                }
            );
        };

        const secondPhase = () => {
            
            let firstRectangle = detail.getBoundingClientRect();
            let lastRectangle  = itemImage.getBoundingClientRect();

            item.style.opacity = 1;
            detail.style.display = "none";

            item.animate(
                [
                    {
                        zIndex: 2,
                        transform:`
                            translateX(${firstRectangle.left - lastRectangle.left}px)
                            translateY(${firstRectangle.top - lastRectangle.top}px)
                            scale(${firstRectangle.width / lastRectangle.width})
                        `
                    },
                    {
                        zIndex: 2,
                        transform:`
                            translateX(0)
                            translateY(0)
                            scale(1)
                        `
                    }
                ],
                {
                    duration: 1000,
                    easing: 'cubic-bezier(0.2, 0, 0.2, 1'
                }
            );
        };

        if(!firstPhaseClick && !secondPhaseClick) {
            detail.style.display = "none";
        }

        if(firstPhaseClick) {
            firstPhase();
        }

        if(secondPhaseClick) {
            secondPhase();
        }

    }, [firstPhaseClick]);

    return (
        <div className='flip-container'>
            <div className='flip-item' onClick={handleFirstPhaseClick}>
                <img className='flip-image' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png'/>
            </div>
            <div className='flip-detail' onClick={handleSecondPhaseClick}>
                <img className='flip-image' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png'/>
                <div className='flip-content'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.
                </div>
            </div>
        </div>
    );
}

export default Flip;