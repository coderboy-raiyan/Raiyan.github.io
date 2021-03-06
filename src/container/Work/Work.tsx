/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { urlFor } from "client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { AppWrap, MotionWrap } from "Wrapper/index";
import styles from "./Work.module.scss";

function Work({ works }: { works: any }) {
    const [activeFilter, setActiveFilter] = useState("next js");
    const [animateCard, setAnimateCard] = useState<any>({ y: 0, opacity: 1 });
    const [filterWork, setFilterWork] = useState(
        works.filter((work: any) => work.tags.includes("next js"))
    );
    const [tags, setTags] = useState<string[]>([]);

    // Mechanism for filter all the tags dynamically
    useEffect(() => {
        if (works.length) {
            let filterAllTags: string[] = [];
            for (let i = 0; i < works.length; i++) {
                filterAllTags = [...filterAllTags, ...works[i].tags];
            }
            setTags(() => [...new Set(filterAllTags.map((tag) => tag))]);
        }
    }, [works.length]);

    const handelWorkFilter = (item: string) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);

            if (item === "all") {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work: any) => work.tags.includes(item.toLowerCase())));
            }
        }, 500);
    };

    return (
        <div>
            <h2 className="head-text">
                My Creative <span>Portfolio</span> section
            </h2>

            <div className={`${styles.app__work_filter}`}>
                {tags.map((item, index) => (
                    <div
                        className={`${styles.app__work_filter_item} app__flex p-text ${
                            activeFilter.toLowerCase() === item.toLowerCase()
                                ? styles.item_active
                                : ""
                        }`}
                        onClick={() => handelWorkFilter(item)}
                        key={index}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className={`${styles.app__work_portfolio}`}
            >
                {filterWork?.map((item: any, index: any) => (
                    <div className={`${styles.app__work_item} app__flex`} key={index}>
                        <div className={`${styles.app__work_img} app__flex`}>
                            <img src={`${urlFor(item.imgUrl)}`} alt="" />

                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                    staggerChildren: 0.5,
                                }}
                                className={`${styles.app__work_hover} app__flex`}
                            >
                                <a href={item.projectLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillEye />
                                    </motion.div>
                                </a>
                                <a href={item.codeLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillGithub />
                                    </motion.div>
                                </a>
                            </motion.div>
                        </div>

                        <div className={`${styles.app__work_content} app__flex`}>
                            <h4 className="bold-text">{item.title}</h4>
                            <p className="p-text" style={{ marginTop: 10 }}>
                                {item.description}
                            </p>

                            <div className={`${styles.app__work_tag} app__flex`}>
                                <p className="p-text">{item?.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default AppWrap(MotionWrap(Work, `${styles.app__works}`), "work", "app__primarybg");
