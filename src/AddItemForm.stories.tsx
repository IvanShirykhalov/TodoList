

    return (
        <div>
            <TextField variant={'standard'}
                       label={'Type value'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={onClickHandler} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})