import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');

const Navbar = () => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ 
      position: 'sticky', 
      background: '#000', 
      top: 0, 
      justifyContent: 'space-between'
    }}
  >
    <Link to="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="DeltaTube logo" height={45}/>
    </Link>
    <a
      href={`${publicUrl}/shorts.html`}
      style={{
        color: '#5fa8d3',
        fontFamily: "'8bitoperator JVE', monospace",
        fontSize: '13px',
        textDecoration: 'none',
        padding: '4px 10px',
        border: '1px solid #5fa8d3',
        borderRadius: '2px',
        whiteSpace: 'nowrap',
      }}
    >
      ▶ Shorts
    </a>
    <SearchBar />
  </Stack>
);

export default Navbar;
