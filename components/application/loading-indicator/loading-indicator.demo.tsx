import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

export const DefaultDemo = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
            <LoadingIndicator type="line-simple" size="md" label="Laster …" />
            <LoadingIndicator type="line-spinner" size="md" label="Laster …" />
            <LoadingIndicator type="dot-circle" size="md" label="Laster …" />
        </div>
    );
};

export const LineSimpleDemo = () => {
    return <LoadingIndicator type="line-simple" size="md" />;
};

export const LineSimpleWithLabelDemo = () => {
    return <LoadingIndicator type="line-simple" size="md" label="Laster …" />;
};

export const LineSpinnerDemo = () => {
    return <LoadingIndicator type="line-spinner" size="md" />;
};

export const LineSpinnerWithLabelDemo = () => {
    return <LoadingIndicator type="line-spinner" size="md" label="Laster …" />;
};

export const DotCircleDemo = () => {
    return <LoadingIndicator type="dot-circle" size="md" />;
};

export const DotCircleWithLabelDemo = () => {
    return <LoadingIndicator type="dot-circle" size="md" label="Laster …" />;
};

export const SizesDemo = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row">
            <LoadingIndicator type="line-simple" size="sm" label="Laster …" />
            <LoadingIndicator type="line-simple" size="md" label="Laster …" />
            <LoadingIndicator type="line-simple" size="lg" label="Laster …" />
            <LoadingIndicator type="line-simple" size="xl" label="Laster …" />
        </div>
    );
};

export const LoadingIndicatorLineSimple = () => (
    <div className="flex flex-col items-start gap-8 md:flex-row">
        <LoadingIndicator type="line-simple" size="sm" label="Laster …" />
        <LoadingIndicator type="line-simple" size="md" label="Laster …" />
        <LoadingIndicator type="line-simple" size="lg" label="Laster …" />
        <LoadingIndicator type="line-simple" size="xl" label="Laster …" />
    </div>
);

export const LoadingIndicatorLineSpinner = () => (
    <div className="flex flex-col items-start gap-8 md:flex-row">
        <LoadingIndicator type="line-spinner" size="sm" label="Laster …" />
        <LoadingIndicator type="line-spinner" size="md" label="Laster …" />
        <LoadingIndicator type="line-spinner" size="lg" label="Laster …" />
        <LoadingIndicator type="line-spinner" size="xl" label="Laster …" />
    </div>
);

export const LoadingIndicatorDotCircle = () => (
    <div className="flex flex-col items-start gap-8 md:flex-row">
        <LoadingIndicator type="dot-circle" size="sm" label="Laster …" />
        <LoadingIndicator type="dot-circle" size="md" label="Laster …" />
        <LoadingIndicator type="dot-circle" size="lg" label="Laster …" />
        <LoadingIndicator type="dot-circle" size="xl" label="Laster …" />
    </div>
);
