import * as React from "react";
import { liveClassName, LiveProperties } from "./shared";


interface GenericProps {
    value: React.ReactText,
    className?: string,
    onChange?: (value: string) => void,
    disabled?: boolean
}

class GenericHtmlTextbox<P extends GenericProps> extends React.PureComponent<P>{
    render() {
        return (
            <input type="text"
                className={this.getClassName()}
                value={this.props.value !== null ? this.props.value + '' : ''}
                onChange={e => this.props.onChange?this.props.onChange(e.currentTarget.value): null}
                disabled={this.props.disabled || false}
            />
        );
    }

    protected getClassName() {
        return this.props.className;
    }
}


interface Props extends GenericProps, LiveProperties<React.ReactText> { }

export default class TrackedTextbox extends GenericHtmlTextbox<Props> {
    protected getClassName() {
        return liveClassName(this.props.className, this.props.value !== this.props.underlyingValue);
    }
}
