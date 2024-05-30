import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { ImagesGallery } from "../components";
import { useForm } from "../../hooks";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {
  const distpatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );
  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateStrig = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    distpatch( setActiveNote( formState ) );
  }, [formState]);

  useEffect(() => {
    if ( messageSaved.length > 0 )
        Swal.fire('Nota actualizada', messageSaved, 'success');
  }, [messageSaved])
  
  const fileInputRef = useRef();

  const onSaveNote = () => {
    distpatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
    if(target.files === 0) return;
    distpatch( startUploadingFiles( target.files ));
  }

  const onDelete = () => {
    distpatch( startDeletingNote() );
  }

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='column'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid>
          <Typography fontSize={ 39 } fontWeight='light'>
            { dateStrig }
          </Typography>
        </Grid>

        <Grid item>

          <input
            type="file"
            multiple
            ref={ fileInputRef }
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
            />

          <IconButton
            color="primary"
            disabled={isSaving}
            onClick={ () => fileInputRef.current.click() }
          >
            <UploadOutlined />
          </IconButton>

          <Button
            disabled={isSaving}
            onClick={ onSaveNote }
            color="primary"
            sx={{ p:2 }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1}}></SaveOutlined>
            Guardar
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese titulo"
          label="Titulo"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
  
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio en el día de hoy?"
          minRows={ 5 }
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <Grid container>
        <ImagesGallery images={ note.imagesUrls } />
      </Grid>

    </Grid>
  )
}
