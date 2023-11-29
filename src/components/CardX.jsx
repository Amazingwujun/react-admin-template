import {Divider} from "antd";

const HEADER_STYLE = {
    height: 56,
    fontSize: 18,
    fontWeight: 800,
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 24px',
}

/**
 * 自定义的卡片组件，对比 antd 提供的 card, 最大的区别在于 body 是撑开(height, width 100%)的
 */
function CardX({left, center, right, ref, bodyDirection = 'column', children}) {
    return (
        <div ref={ref} className='full-container'
             style={{display: "flex", flexDirection: 'column', background: '#ffffff', borderRadius: 2}}>
            <div
                style={HEADER_STYLE}
            >
                <div>
                    {left}
                </div>
                <div>
                    {center}
                </div>
                <div>
                    {right}
                </div>
            </div>
            <Divider style={{margin: 0}}/>
            <div style={{flex: "auto", display: "flex", flexDirection: bodyDirection, padding: 24}}>
                {children}
            </div>
        </div>
    )
}


export default CardX;