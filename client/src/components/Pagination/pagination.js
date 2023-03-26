import React from 'react';
import { Link } from 'react-router-dom';
import '../Videogames/Videogame.css'

export default function Pagination({ allVideogames, page, setPage }) {

    const totalPages = allVideogames.length === 0 ? 1 : Math.ceil(allVideogames.length / 15);
    const allPages = [];
    for (let i = 1; i <= totalPages; i++) {
        allPages.push(i)
    }

    const pageData = allPages.map(p => {
        if (p === allPages[0] || p === allPages[allPages.length - 1]) {

        }
        else if (p === page - 1 || p === page - 2 || p === page + 1 || p === page + 2) {
            return (
                <Link key={p} to={`/home?pag=${p}`}>
                    <button className="currentPage" onClick={() => setPage(p)}>{p}</button>
                </Link>
            )
        }
        else if (p === page) {
            return (
                <Link key={p} to={`/home?pag=${p}`}>
                    <button className="current" onClick={() => setPage(p)}>{p}</button>
                </Link>
            )
        }
        else if (p === 1) {
            return (
                <Link key={p} to={`/home?pag=${p}`}>
                    <button className="currentPage" onClick={() => setPage(p)}>{p}</button>
                </Link>
            )
        }
    })

    return (
        <div className="paginationBtns1">
            {allPages[0] === page ? null :
                <Link to={`/home?pag=${page - 1}`}>
                    <button className="btnBack material-icons" onClick={() => { if (page > 1) setPage(page - 1) }}>arrow_left</button>
                </Link>}
            {allPages.length === 1 ? null : <Link to={`/home?pag=${allPages[0]}`}>
                <button className={page === allPages[0] ? "current" : "currentPage"} onClick={() => setPage(allPages[0])}>{allPages[0]}</button>
            </Link>}
            {
                (page - 2) - allPages[0] >= 2 ? <button className="range">...</button> : null
            }
            {pageData.length > 1 ? pageData : <Link to={`/home?pag=${1}`}>
                <button className="current uniquePage" onClick={() => setPage(1)}>{1}</button>
            </Link>}
            {
                allPages[allPages.length - 1] - (page + 2) >= 2 ? <button className="range">...</button> : null
            }
            {allPages.length === 1 ? null : <Link to={`/home?pag=${allPages[allPages.length - 1]}`}>
                <button className={page === allPages[allPages.length - 1] ? "current" : "currentPage"} onClick={() => setPage(allPages[allPages.length - 1])}>{allPages[allPages.length - 1]}</button>
            </Link>}
            {
                allPages[allPages.length - 1] === page ? null :
                    <Link to={`/home?pag=${page + 1}`}>
                        <button className="btnNext material-icons" onClick={() => setPage(page + 1)}>arrow_right</button>
                    </Link>}
        </div>
    )
}