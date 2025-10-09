import { Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';
import GNews from './GNews';
import Search from './Search';
import SearchResult from './SearchResult';
import SpaceHome from './space/SpaceHome';
import Agency from './space/Agency';

const Navigation = () => {

    var tоday = new Date;
    var year = tоday.getFullYear();

    return (
        <>
            <HashRouter basename="/">
                <div className='navigation'>
                    <div className='fixed'>
                        <NavLink to="/"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className='home'>
                            NEWS from AROUND the WORLD
                        </NavLink>
                        <Search />
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/news' element={<SearchResult />} />
                    <Route path='/option/:event' element={<GNews />} />
                    <Route path='/space' element={<SpaceHome />} />
                    <Route path='/space/:name' element={<Agency />} />
                </Routes>
                <div className='news'>
                    <div className='footer'>
                        <p>The data for this site is collected from free APIs. That's why the news is not the most recent. Currents api has a limit of 20 calls per day. For the New York Times, the news on the front page is related to New York. For the Guardian it is news from London.</p>
                        <p>© {year} InTerVal</p>
                    </div>
                </div>
            </HashRouter>
        </>
    )
}
export default Navigation;