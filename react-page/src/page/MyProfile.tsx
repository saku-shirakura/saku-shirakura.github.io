import {FULL_NAME, MY_ICON} from "../CONSTANTS_MY_PROFILE";
import "./MyProfile.css"
import {FaGithub, FaXTwitter} from "react-icons/fa6";
import React, {useState} from "react";
import useInterval from "use-interval";

const SocialIconTags =
    [
        <a href="https://github.com/saku-shirakura"
           className="social_icon_a">
            <FaGithub className="social_icon"/>
        </a>,
        <a href="https://twitter.com/saku_shirakura" className="social_icon_a">
            <FaXTwitter className="social_icon"/>
        </a>,
    ]

export const MyProfile = () => {
    const [showAllSocialIcons, setShowAllSocialIcons] = useState(false);

    const [isHover, setIsHover] = useState(false);

    const [socialIconCount, setSocialIconCount] = useState(0);

    const [socialIcon, setSocialIcon] = useState(0);

    useInterval(() => {
        handleChangeSocialIcon();
    }, 3000);

    const handleChangeSocialIcon = () => {
        if (showAllSocialIcons) {
            setSocialIcon(0);
            return;
        }
        if (isHover)
            return;
        setSocialIconCount(prevState => prevState + 1);
        if (socialIconCount < 0 || socialIconCount + 1 >= SocialIconTags.length)
            setSocialIconCount(0)
        setSocialIcon(socialIconCount)
    }

    const SocialIcons = (props: { showAll: boolean, socialIcon: number }) => {
        if (showAllSocialIcons)
            return (
                <>
                    {
                        SocialIconTags.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {value}
                                </React.Fragment>
                            )
                        })
                    }
                </>
            );
        else {
            if (socialIcon >= 0 && socialIcon < SocialIconTags.length)
                return (
                    <div onMouseOut={() => setIsHover(false)}
                         onMouseOver={() => setIsHover(true)}>
                        {SocialIconTags[socialIcon]}
                    </div>
                );
            else
                return (
                    <></>
                );
        }
    }

    return (
        <>
            <div className="profile_tray">
                <a href="https://saku-shirakura.com/"
                   className="social_icon_a"
                   onClick={event => {
                       event.preventDefault();
                       setShowAllSocialIcons(prevState => !prevState);
                   }}
                >
                    <img src={MY_ICON} alt="User Icon" className="user_icon"/>
                </a>
            </div>
            <div className="profile_tray">
                <SocialIcons showAll={showAllSocialIcons} socialIcon={socialIcon}/>
            </div>
            <p className="user_full_name">{FULL_NAME}</p>
        </>
    );
}