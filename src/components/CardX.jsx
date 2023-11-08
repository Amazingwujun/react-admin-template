import {Divider} from "antd";

const HEADER_STYLE = {
    height: 56,
    fontSize: 18,
    fontWeight: 800,
    display: "flex",
    justifyContent: 'start',
    alignItems: 'center',
    padding: '0px 24px',
}

function CardX({title, ref, bodyDirection = 'column', children}) {
    return (
        <div ref={ref} className='full-container'
             style={{display: "flex", flexDirection: 'column', background: '#ffffff', borderRadius: 2}}>
            <div
                style={HEADER_STYLE}
            >
                {title}
            </div>
            <Divider style={{margin: 0}}/>
            <div style={{flex: "auto", display: "flex", flexDirection: bodyDirection, padding: 24}}>
                {children}
            </div>
        </div>
    )
}

export default CardX;