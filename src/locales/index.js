import locale from '../../src/locales/languages';
import { getLanguagePref } from '../Constants/AsyncStorageHelper';
import { loadMessages, loadCldr } from 'react-native-globalize';


const metadata = {
    locale: async function () {
        const language = await getLanguagePref();
        return language;
    },
    currency: function () {
        return "INR"
    },
    dateformat: function () {
        return "yyyyMMMdd"
    },
    messages: function () {
        loadCldr(
            // Load the locales you actually need
            require('react-native-globalize/locale-data/de'),
            require('react-native-globalize/locale-data/en'),
            require('react-native-globalize/locale-data/es'),
        );
        return  loadMessages(locale);
    }
}

export default metadata;