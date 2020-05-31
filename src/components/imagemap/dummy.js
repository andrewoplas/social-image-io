const action = (
  <React.Fragment>
    <CommonButton
      className="rde-action-btn"
      shape="circle"
      icon="file-download"
      disabled={!editing}
      tooltipTitle={i18n.t('action.download')}
      onClick={onDownload}
      tooltipPlacement="bottomRight"
    />
    {editing ? (
      <Popconfirm
        title={i18n.t('imagemap.imagemap-editing-confirm')}
        okText={i18n.t('action.ok')}
        cancelText={i18n.t('action.cancel')}
        onConfirm={onUpload}
        placement="bottomRight"
      >
        <CommonButton
          className="rde-action-btn"
          shape="circle"
          icon="file-upload"
          tooltipTitle={i18n.t('action.upload')}
          tooltipPlacement="bottomRight"
        />
      </Popconfirm>
    ) : (
      <CommonButton
        className="rde-action-btn"
        shape="circle"
        icon="file-upload"
        tooltipTitle={i18n.t('action.upload')}
        tooltipPlacement="bottomRight"
        onClick={onUpload}
      />
    )}
    <CommonButton
      className="rde-action-btn"
      shape="circle"
      icon="image"
      tooltipTitle={i18n.t('action.image-save')}
      onClick={onSaveImage}
      tooltipPlacement="bottomRight"
    />
  </React.Fragment>
);

// const titleContent = (
//   <React.Fragment>
//     <span>{i18n.t('imagemap.imagemap-editor')}</span>
//   </React.Fragment>
// );

// const title = <ImageMapTitle title={titleContent} action={action} />;
