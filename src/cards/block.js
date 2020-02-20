/**
 * Block dependencies
 */
import icons from './icons';
import './editor.scss';
import './style.css';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    InspectorControls,
    RichText,
    URLInput,
} = wp.editor;
const {
    Button,
    SelectControl,
    RadioControl,
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/interactive-card',
    {
        title: __( 'Interactive Card', 'clbinteractivecards' ),
        description: __( 'Add interactive cards to your content ', 'clbinteractivecards'),
        category: 'common',
        parent: ['cgb/interactive-cardset'],
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: 'images-alt2',
	   },
        keywords: [ __( 'card' ), __( 'flip' ), __( 'image' ) ],
        attributes: {
            imgURL: {
                type: 'string',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
           },
           cardType: {
 			type: 'string',
 			default: 'basic',
 		},
          cardTitle: {
			source: 'html',
			selector: '.clb-card__title',
			// default: __( 'Card Title' ),
		},
          cardLink: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
          cardBody: {
               source: 'html',
               selector: '.clb-card__body',
          },
          buttonText: {
               source: 'html',
               selector: '.clb-card__button-text',
               default: 'Learn More',
          },
        },
        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, cardType, cardTitle, cardLink, cardBody, buttonText },
                className, setAttributes, isSelected } = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }

            const onChangeCardType = cardType => { setAttributes( { cardType } ) };
            const onChangeTitle = cardTitle => { setAttributes( { cardTitle } ) };
            const onChangeBody = cardBody => { setAttributes( { cardBody } ) };
            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Card Settings', 'clbinteractivecards' ) }
                   >
                       <PanelRow>
                       <RadioControl
                            label="Card Type"
                            selected={ cardType }
                            options={ [
                                { label: 'Basic', value: 'basic' },
                                { label: 'Flip', value: 'flip' },
                            ] }
                            onChange={ onChangeCardType }
                         />

                       </PanelRow>
                   </PanelBody>
               </InspectorControls>

			 <div className={ className }>

                    { ! imgID ? (

                         <Fragment>
					<MediaUploadCheck>
	                        <MediaUpload
	                            onSelect={ onSelectImage }
	                            type="image"
	                            value={ imgID }
	                            render={ ( { open } ) => (
	                                <Button
	                                    className={ "button button-large" }
	                                    onClick={ open }
	                                >
	                                    { __( 'Upload Card Image', 'clbinteractivecards' ) }
	                                </Button>
	                            ) }
	                        >
	                        </MediaUpload>
				    </MediaUploadCheck>

                        <TextControl
                            className='clb-card__title'
                            label={ 'Card Title' }
                            value={ cardTitle }
                            placeholder={ 'Card Title' }
                            onChange={ onChangeTitle }
                       />
                       <URLInput
                               className="clb-card__link"
                               value={ cardLink }
                               onChange={ cardLink => setAttributes( { cardLink } ) }
                           />
                           { cardType == 'flip' && (
                                <div>
                                <TextareaControl
                                   className='clb-card__body'
                                   label={ 'Card Body' }
                                   value={ cardBody }
                                   placeholder={ 'Card Body' }
                                   onChange={ onChangeBody }
                                />
                                <TextControl
                                   className='clb-card__button-text'
                                   label={ 'Button Text' }
                                   value={ buttonText }
                                   placeholder={ 'Card Body' }
                                   onChange={ onChangeButtonText }
                                />
                                </div>
                         ) }

                       </Fragment>

                    ) : (

                         <div className ={ className }>

                         { isSelected ? (

                            <div className ={ className + "-selected" } >

                                <img
                                   src={ imgURL }
                                   alt={ imgAlt }
                                   className = "card-selected-image"
                                />

                                 <MediaUploadCheck>
                                    <MediaUpload
                                         onSelect={ onSelectImage }
                                         type="image"
                                         value={ imgID }
                                         render={ ( { open } ) => (
                                             <Button
                                                className={ "button button-large" }
                                                onClick={ open }
                                             >
                                                { __( 'Change Card Image', 'clbinteractivecards' ) }
                                             </Button>
                                         ) }
                                    >
                                    </MediaUpload>
                               </MediaUploadCheck>

                                <TextControl
                                    className='clb-card__title'
                                    label={ 'Card Title' }
                                    value={ cardTitle }
                                    placeholder={ 'Card Title' }
                                    onChange={ onChangeTitle }
                               />
                               <URLInput
                                       className="clb-card__link"
                                       value={ cardLink }
                                       onChange={ cardLink => setAttributes( { cardLink } ) }
                                   />
                                   { cardType == 'flip' && (
                                       <div>
                                       <TextareaControl
                                          className='clb-card__body'
                                          label={ 'Card Body' }
                                          value={ cardBody }
                                          placeholder={ 'Card Body' }
                                          onChange={ onChangeBody }
                                       />
                                       <TextControl
                                          className='clb-card__button-text'
                                          label={ 'Button Text' }
                                          value={ buttonText }
                                          placeholder={ 'Card Body' }
                                          onChange={ onChangeButtonText }
                                       />
                                       </div>
                                ) }

                                   </div>

                            ) : (

                                 <div className="clb-card-static">
                                      <img
                                        src={ imgURL }
                                        alt={ imgAlt }
                                        className = "card-static-image"
                                     />
                                     <strong>{cardTitle}</strong>
                                </div>

                            ) }

                            </div>

                    )}

                </div>
			 </Fragment>
            );
        },
        save: props => {
            const { imgID, imgURL, imgAlt, cardType, cardTitle, cardLink, cardBody, buttonText } = props.attributes;

            return (

                 <div className={"interactive-card" + ' card-' + cardType}>

                 { cardType == 'basic' && (
                      <a href={cardLink}>
                               <img
                                  src={ imgURL }
                                  alt={ imgAlt }
                               />
                               <h4 className="clb-card__title">{cardTitle}</h4>
                         </a>
                 )}

                 { cardType == 'flip' && (
                      <div className="card-flip-inner">
                         <div className="flip-card-front" style={ {
							backgroundImage: `url(${ imgURL })`,
							backgroundSize: 'cover',
                                   backgroundPosition: 'center',
						} }>
                              <h4 className="clb-card__title">{cardTitle}</h4>
                         </div>
                              <div className="flip-card-back">
                                   <h4 className="clb-card__title">{cardTitle}</h4>
                                   <div className="clb-card__body">{cardBody}</div>
                                   <a href={cardLink} className="clb-card__button-text button">{buttonText}</a>
                              </div>
                         </div>
                )}

                </div>
            );
        },
    },
);
