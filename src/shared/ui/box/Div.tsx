import type {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

export type WidthHeight = {
  width?: string
  height?: string
}

export type MinMaxWidthHeight = {
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
}

export type LeftRightTopBottom = {
  left?: string
  right?: string
  top?: string
  bottom?: string
}

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type DivProps = ReactDivProps &
  PropsWithChildren<WidthHeight> &
  LeftRightTopBottom &
  MinMaxWidthHeight & {
  src?: string
}

const Div: FC<DivProps> = ({
 width, height, src,
 left, right, top, bottom,
 minWidth, maxWidth, minHeight, maxHeight,
 style: _style,
 className: _className,
 ...props
}) => {
  const styles = {
    ..._style,
    width, height,
    left, right, top, bottom,
    minWidth, maxWidth, minHeight, maxHeight,
    backgroundImage: src && `url(${src})`,
  };

  const className = [
    'box-border',
    src ? 'bg-gray-300 bg-contain' : '',
    _className,
  ].join(' ').trim();

  return <div {...props} className={className} style={styles} />;
};

export default Div;