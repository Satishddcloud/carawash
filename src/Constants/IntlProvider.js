
export default (props, key) => props.globalize.getMessageFormatter(key)()

export const IntlCurrencyProvider = (props, value) => {
    return props.globalize.getCurrencyFormatter(props.globalize.currencyCode, { minimumFractionDigits: 0, maximumFractionDigits: 0 })(value);
}