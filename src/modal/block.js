/**
 * Block dependencies
 */
//import classnames from 'classnames';
import icon from './icon';
import './style.css';
import './editor.css';

/**
 * Internal block libraries
 */

const { Fragment } = wp.element;
const {
    registerBlockType,
} = wp.blocks;
const {
    InspectorControls,
    RichText,
    InnerBlocks
} = wp.editor;
const {
     Toolbar,
     Button,
     Tooltip,
     PanelBody,
     PanelRow,
     FormToggle,
     TextControl,
     IconButton,
     RangeControl,
} = wp.components;



/**
 * Register example block
 */
export default registerBlockType(
    'clb-custom-blocks/modal',
    {
        title: 'Modal',
        description:  'Add a new modal window to the page.',
        category: 'common',
        icon: {
             foreground: '#fff',
             background: '#3883d6',
            src: icon,
        },
        keywords: [
            'popup',
            'window',
            'show'
        ],
        attributes: {
             title: {
                type: 'string',
                source: 'text',
                selector: '.modal-title',
             },
             button: {
                type: 'string',
                source: 'text',
                default: 'Click Here to Learn More',
                selector: '.modal-button-text',
             },
             slug: {
                type: 'string',
             },
             body: {
                 type: 'array',
                 source: 'children',
                 selector: '.modal-body',
             }
        },

        edit: props => {
            const { attributes: { title, button, slug, body }, className, isSelected, setAttributes } = props;
            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeButton = button => { setAttributes( { button } ) };
            const onChangeBody = body => { setAttributes( { body } ) };

            function slugify(text) {
                if( !text ) { return ''; }
                   return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
                 }

            // function createSlug(text) {
            //      return Math.random().toString().replace('0.', '');
            // }

            //
            //const onChangeSlug = slug => { setAttributes( { slug : getRandomInt(1, 1000000) } ) };
            //const onChangeSlug = slug => { setAttributes( { slug : 'TEST' } ) };
            const onChangeSlug = slug => { setAttributes( { slug : slugify(title) } ) };

            onChangeSlug();


            return (
                <div className={ className }>
                { isSelected ? (
                     <div className ={ className + "-selected" } >
                     <TextControl
                          className='modal-title-input'
                          label={ 'Title' }
                          value={ title }
                          placeholder={ 'Modal Title Here' }
                          onChange={ onChangeTitle }
                     />
                     <TextControl
                          className='modal-button-text-input'
                          label={ 'Button' }
                          value={ button }

                          onChange={ onChangeButton }
                     />
                     <h4 className="modal-body-header">Modal Body</h4>
                     <InnerBlocks
                         allowedBlocks={ [
                              'core/paragraph',
                              'core/list',
                              'core/code',
                              'core/embed',
                              'core/heading',
                              'core/html',
                              'core/image',
                              'core/preformatted',
                              'core/quote',
                              'core/separator',
                              'core/shortcode',
                              'core/spacer',
                         ] }
                     />


                    </div>
               ) : (
                  <div className="static-modal-window">
                       <div className="clb-close-button"><span class="dashicons dashicons-no"></span></div>
                       <h4>{title}</h4>
                       <div className="button-text">Button Text: {button}</div>
                       <div className="modal-inner-block-area">
                            <InnerBlocks
                               allowedBlocks={ [
                                    'core/paragraph',
                                    'core/list',
                                    'core/code',
                                    'core/embed',
                                    'core/heading',
                                    'core/html',
                                    'core/image',
                                    'core/preformatted',
                                    'core/quote',
                                    'core/separator',
                                    'core/shortcode',
                                    'core/spacer',
                               ] }
                           />
                       </div>
                  </div>
               )}
                </div>
            );
        },
        save: props => {
                    const { attributes: { title, button, slug, body } } = props;

                    // any JS functions or manipulations here...
                    let buttonText = button;
                    if( (button === '') || (button === null) ) { buttonText = title; }

                    let slugOutput = '#' + slug;

                    return (

                    <div className="modal-area">
                     <a className="button" href={slugOutput} data-toggle="modal"><span className="modal-button-text">{buttonText}</span></a>

                     <div className="clb-custom-modal-move">
                     <div id={slug} className="modal fade" tabindex="-1" role="dialog">
                         <div className="modal-dialog" role="document">
                             <div className="modal-content">
                                 <div className="modal-header">

                                    <h4 className="modal-title">{title}</h4>
                     				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
                               			<span aria-hidden="true">×</span>
                             			</button>
                                 </div>

                                 <div className="modal-body"><InnerBlocks.Content />{body}</div>
                             </div>
                         </div>
                     </div>
                     </div>

                     </div>
                    );
                },
    },
);
