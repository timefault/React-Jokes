import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';


export function Sidebar({ jokeCount, setJokeCount }: { jokeCount: number, setJokeCount: any }) {
    const anchor = "top";

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (e.type !== 'click') return
        console.log(e.type);
        setIsOpen(!isOpen);
    };

    const drawerTitle = () => {
        return (
            <h5>How many jokes?</h5>
        );
    };

    return (
        <>
            <Button variant="contained" onClick={toggleDrawer}>Menu</Button>
            <Drawer
                anchor={anchor}
                open={isOpen}
                onClose={toggleDrawer}
            >
                {drawerTitle()}
                <p>{jokeCount}</p>
                <Slider
                    min={1}
                    max={10}
                    value={jokeCount}
                    onChange={(e: Event, newValue: number | number[]) => { setJokeCount(newValue as number) }}
                    sx={{
                        color: 'purple',
                        width: '90%',
                        margin: '0 auto',
                    }}
                ></Slider>
            </Drawer>
        </>
    );
}