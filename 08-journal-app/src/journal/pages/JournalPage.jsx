import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JorunalLayout } from '../layout/JorunalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  const { isSaving, active } = useSelector( state => state.journal );
  const dispatch = useDispatch();

  const hasActiveNote = useMemo( () => active != null, [active]);

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JorunalLayout>
      {
        (
          hasActiveNote 
          ? <NoteView />
          : <NothingSelectedView />
        )
      }
      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {
            backgroundColor: 'error.main', opacity: 0.9
          },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JorunalLayout>
  )
}
