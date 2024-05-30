import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';


export const SideBarItem = ({ title, body, id, date, imagesUrls = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo( () => {
    return title.length > 17 
      ? title.substring(0, 17) + '...'
      : title;
  }, [title]);

  const onClickActiveNote = ( ) => {
    dispatch( setActiveNote( { id, title, body, date, imagesUrls } ) );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={ onClickActiveNote }
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
