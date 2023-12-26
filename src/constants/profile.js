// constants for language
export const VIETNAMESE = 'Vietnamese';
export const ENGLISH = 'English';
export const JAPANESE = 'Japanese';
export const FRENCH = 'French';
export const SPANISH = 'Spanish';
export const CHINESE = 'Chinese';

export const nationalities = [
    { id: 1, value: VIETNAMESE, certificate: require('../assets/img/vietnamese.png') },
    { id: 2, value: ENGLISH, certificate: require('../assets/img/english.png') },
    { id: 3, value: JAPANESE, certificate: require('../assets/img/japanese.png') },
    { id: 4, value: FRENCH, certificate: require('../assets/img/french.png') },
    { id: 5, value: SPANISH, certificate: require('../assets/img/spanish.png') },
    { id: 6, value: CHINESE, certificate: require('../assets/img/chinese.png') },
];
// constants for want_to
export const CHILD_CARE = 'ChildCare';
export const COOKING = 'Cooking';
export const BOTH = 'Cooking and ChildCare';

export const want_to = [
    { id: 'target_find_child_care', label: '赤ちゃんの世話や料理をしてくれる人を探したい', value: CHILD_CARE },
    { id: 'target_find_cooking', label: '赤ちゃんに料理を作ってくれる人を探したい', value: COOKING },
    { id: 'target_find_both', label: '両方', value: BOTH },
];

// constants for gender
export const MALE = 'male';
export const FEMALE = 'female';
export const OTHER = 'other';

export const genders = [
    { id: 'gender-male-label-id', label: 'Male', value: MALE },
    { id: 'gender-female-label-id', label: 'Female', value: FEMALE },
    { id: 'gender-other-label-id', label: 'Other', value: OTHER },
];
