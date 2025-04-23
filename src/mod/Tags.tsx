import { Space, Tag } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";

interface MyTagProps extends PropsWithChildren, React.ComponentProps<typeof Tag> {
    subtitle?: ReactNode
    TagLayout?: 'vertical' | 'horizontal'
}

export const Tags: FC<MyTagProps> = (props) => (
    <Space
        className='tags'
        style={props.style}
        direction={props.TagLayout}
        size={0}
    >
        {props.children &&
            <Tag
                className='tagt'
                {...props}
                style={{
                    marginInlineEnd: 0,
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 4
                }} //不再继承style
            >{props.children}</Tag>}

        {props.subtitle
            &&
            <span
                style={{
                    color: 'white',
                    padding: 4,
                }}>
                {props.subtitle}
            </span>
        }
    </Space >
);