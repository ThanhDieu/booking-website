import { useTranslation } from '@m0-0a/next-intl';

export default function useIbeTranslation(key: string) {
  const { t } = useTranslation();
  const translatedData = {
    resultPage: {
      dataNotification: t('resultPage_dataNotification'),
      noBundle: t('resultPage_noBundle'),
      allBundles: t('resultPage_allBundles'),
      noPeopleAndContact: t('resultPage_noPeopleAndContact'),
      noFilterMatched: t('resultPage_noFilterMatched'),
      noResultMatched: t('resultPage_noResultMatched'),
      filterName: {
        priceRange: t('resultPage_filterName_priceRange'),
        landscape: t('resultPage_filterName_landscape'),
        activities: t('resultPage_filterName_activities'),
        specialOffer: t('resultPage_filterName_specialOffer'),
        priceContent: {
          max: t('resultPage_filterName_priceContent_max'),
          min: t('resultPage_filterName_priceContent_min'),
        },
      },
      localizations: {
        dataNotification: t('resultPage_localizations_dataNotification'),
      },
    },
    accountPage: {
      login: {
        profile: t('accountPage_login_profile'),
        yourBooking: t('accountPage_login_yourBooking'),
        signOut: t('accountPage_login_signOut'),
        login: t('accountPage_login_login'),
        title: t('accountPage_login_title'),
        zitadelText: t('accountPage_login_zitadelText'),
        signUpTitle: t('accountPage_login_signUpTitle'),
      },
      register: {
        signUp: t('accountPage_register_signUp'),
        signIn: t('accountPage_register_signIn'),
        title: t('accountPage_register_title'),
        signInText: t('accountPage_register_signInText'),
        acceptText: t('accountPage_register_acceptText'),
        acceptLink: t('accountPage_register_acceptLink'),
      },
      profile: {
        tabTitleGeneral: t('accountPage_profile_tabTitleGeneral'),
        tabTitlePassword: t('accountPage_profile_tabTitlePassword'),
        tabTitleGuestsTogether: t('accountPage_profile_tabTitleGuestsTogether'),
        general: {
          information: {
            title: t('accountPage_profile_general_information_title'),
            fullName: t('accountPage_profile_general_information_fullName'),
            firstName: t('accountPage_profile_general_information_firstName'),
            lastName: t('accountPage_profile_general_information_lastName'),
            phoneNumber: t('accountPage_profile_general_information_phoneNumber'),
            dateOfBirth: t('accountPage_profile_general_information_dateOfBirth'),
            email: t('accountPage_profile_general_information_email'),
            address: t('accountPage_profile_general_information_address'),
            street: t('accountPage_profile_general_information_street'),
            postCode: t('accountPage_profile_general_information_postCode'),
            country: t('accountPage_profile_general_information_country'),
            selectCountry: t('accountPage_profile_general_information_selectCountry'),
            location: t('accountPage_profile_general_information_location'),
            buttonName: {
              edit: t('accountPage_profile_general_information_buttonName_edit'),
              save: t('accountPage_profile_general_information_buttonName_save'),
              discard: t('accountPage_profile_general_information_buttonName_discard'),
              editAvatar: t('accountPage_profile_general_information_buttonName_editAvatar'),
            },
          },
          password: {
            title: t('accountPage_profile_general_password_title'),
            oldPassword: t('accountPage_profile_general_password_oldPassword'),
            newPassword: t('accountPage_profile_general_password_newPassword'),
            confirmPassword: t('accountPage_profile_general_password_confirmPassword'),
            setPassword: t('accountPage_profile_general_password_setPassword'),
          },
          guestsTogether: {
            guest: t('accountPage_profile_general_guestsTogether_guest'),
            title: t('accountPage_profile_general_guestsTogether_title'),
            firstName: t('accountPage_profile_general_guestsTogether_firstName'),
            lastName: t('accountPage_profile_general_guestsTogether_lastName'),
            dateOfBirth: t('accountPage_profile_general_guestsTogether_dateOfBirth'),
            buttonText: {
              buttonSave: t('accountPage_profile_general_guestsTogether_buttonText_buttonSave'),
              buttonAdd: t('accountPage_profile_general_guestsTogether_buttonText_buttonAdd'),
              buttonEdit: t('accountPage_profile_general_guestsTogether_buttonText_buttonEdit'),
              buttonDiscard: t(
                'accountPage_profile_general_guestsTogether_buttonText_buttonDiscard'
              ),
            },
            message: {
              updateProfileSuccess: t(
                'accountPage_profile_general_guestsTogether_message_updateProfileSuccess'
              ),
              updateProfileFaild: t(
                'accountPage_profile_general_guestsTogether_message_updateProfileFaild'
              ),
            },
          },
        },
      },
      yourBookingPage: {
        tabTitleBooking: t('accountPage_yourBookingPage_tabTitleBooking'),
        tabTitleActivities: t('accountPage_yourBookingPage_tabTitleActivities'),
        bookingHistory: {
          upComing: t('accountPage_yourBookingPage_bookingHistory_upComing'),
          history: t('accountPage_yourBookingPage_bookingHistory_history'),
          emptyHistory: t('accountPage_yourBookingPage_bookingHistory_emptyHistory'),
          emptyActivities: t('accountPage_yourBookingPage_bookingHistory_emptyActivities'),
          recent: t('accountPage_yourBookingPage_bookingHistory_recent'),
          viewDetail: t('accountPage_yourBookingPage_bookingHistory_viewDetail'),
          bookAgain: t('accountPage_yourBookingPage_bookingHistory_bookAgain'),
          duration: t('accountPage_yourBookingPage_bookingHistory_duration'),
          guest: t('accountPage_yourBookingPage_bookingHistory_guest'),
          adults: t('accountPage_yourBookingPage_bookingHistory_adults'),
          balance: t('accountPage_yourBookingPage_bookingHistory_balance'),
          childs: t('accountPage_yourBookingPage_bookingHistory_childs'),
          youHave: t('accountPage_yourBookingPage_bookingHistory_youHave'),
          dayLeftPayment: t('accountPage_yourBookingPage_bookingHistory_dayLeftPayment'),
          successfulPayment: t('accountPage_yourBookingPage_bookingHistory_successfulPayment'),
          hotelButton: t('accountPage_yourBookingPage_bookingHistory_hotelButton'),
          bookButton: t('accountPage_yourBookingPage_bookingHistory_bookButton'),
        },
      },
    },
    general: {
      message: {
        format: t('general_message_format'),
        required: t('general_message_required'),
        numberAndSpecialCharacters: t('general_message_numberAndSpecialCharacters'),
        number: t('general_message_number'),
        min: t('general_message_min'),
        readOurPolicy: t('general_message_readOurPolicy'),
        doesNotMatch: t('general_message_doesNotMatch'),
        dateValidate: t('general_message_dateValidate'),
        onlyLetter: t('general_message_onlyLetter'),
      },
      button: {
        cancel: t('general_button_cancel'),
        ok: t('general_button_OK'),
      },
      processMenu_1: {
        step: t('general_processMenu_1_step'),
        stepName: t('general_processMenu_1_stepName'),
        slug: t('general_processMenu_1_slug'),
      },
      processMenu_2: {
        step: t('general_processMenu_2_step'),
        stepName: t('general_processMenu_2_stepName'),
        slug: t('general_processMenu_2_slug'),
      },
      processMenu_3: {
        step: t('general_processMenu_3_step'),
        stepName: t('general_processMenu_3_stepName'),
        slug: t('general_processMenu_3_slug'),
      },
      processMenu_4: {
        step: t('general_processMenu_4_step'),
        stepName: t('general_processMenu_4_stepName'),
        slug: t('general_processMenu_4_slug'),
      },
      processMenu_5: {
        step: t('general_processMenu_5_step'),
        stepName: t('general_processMenu_5_stepName'),
        slug: t('general_processMenu_5_slug'),
      },
      invoice: {
        title: t('general_invoice_title'),
        list: {
          addOns: t('general_invoice_list_addOns'),
          adults: t('general_invoice_list_adults'),
          guests: t('general_invoice_list_guests'),
          nights: t('general_invoice_list_nights'),
          children: t('general_invoice_list_children'),
          roomType: t('general_invoice_list_roomType'),
          included: t('general_invoice_list_included'),
          voucher: t('general_invoice_list_voucher'),
        },
        total: t('general_invoice_total'),
        buttonText: t('general_invoice_buttonText'),
        taxFee: t('general_invoice_taxFee'),
      },
    },
    bookingSteps: {
      step0: {
        perPerson: t('bookingSteps_step0_perPerson'),
        from: t('bookingSteps_step0_from'),
        recommendations: t('bookingSteps_step0_recommendations'),
        noResult: t('bookingSteps_step0_noResult'),
        buttonText: {
          details: t('bookingSteps_step0_buttonText_details'),
        },
      },
      step1: {
        bundleDetail: {
          overwritePrice: t('bookingSteps_step1_bundleDetail_overwritePrice'),
          minimumStay: t('bookingSteps_step1_bundleDetail_minimumStay'),
          maximumStay: t('bookingSteps_step1_bundleDetail_maximumStay'),
          days: t('bookingSteps_step1_bundleDetail_days'),
          buttonText: {
            full: t('bookingSteps_step1_bundleDetail_buttonText_full'),
            minimize: t('bookingSteps_step1_bundleDetail_buttonText_minimize'),
          },
          chooseYourRoom: t('bookingSteps_step1_bundleDetail_chooseYourRoom'),
        },
        room: {
          only: t('bookingSteps_step1_room_only'),
          roomLeft: t('bookingSteps_step1_room_roomLeft'),
          perNight: t('bookingSteps_step1_room_perNight'),
          freeCancel: t('bookingSteps_step1_room_freeCancel'),
          buttonText: t('bookingSteps_step1_room_buttonText'),
        },
        offerDetail: t('bookingSteps_step1_offerDetail'),
      },
      step2: {
        chooseYourAddons: t('bookingSteps_step2_chooseYourAddons'),
        all: t('bookingSteps_step2_all'),
        buttonText: t('bookingSteps_step2_buttonText'),
        youSaved: t('bookingSteps_step2_youSaved'),
        noServices: t('bookingSteps_step2_noServices'),
        popular: t('bookingSteps_step2_popular'),
      },
      step3: {
        secureBookingAlert: {
          title: t('bookingSteps_step3_secureBookingAlert_title'),
          subtitle: t('bookingSteps_step3_secureBookingAlert_subtitle'),
          description: t('bookingSteps_step3_secureBookingAlert_description'),
        },
        giftVoucher: {
          title: t('bookingSteps_step3_giftVoucher_title'),
          help: t('bookingSteps_step3_giftVoucher_help'),
          buttonText: t('bookingSteps_step3_giftVoucher_buttonText'),
          placeholder: t('bookingSteps_step3_giftVoucher_placeholder'),
        },
        booker: {
          title: t('bookingSteps_step3_booker_title'),
          gender: {
            male: t('bookingSteps_step3_booker_gender_male'),
            female: t('bookingSteps_step3_booker_gender_female'),
            other: t('bookingSteps_step3_booker_gender_others'),
          },
          placeholder: {
            title: t('bookingSteps_step3_booker_placeholder_title'),
            firstName: t('bookingSteps_step3_booker_placeholder_firstName'),
            lastName: t('bookingSteps_step3_booker_placeholder_lastName'),
            phoneNumber: t('bookingSteps_step3_booker_placeholder_phoneNumber'),
            email: t('bookingSteps_step3_booker_placeholder_email'),
            checkbox: t('bookingSteps_step3_booker_placeholder_checkbox'),
          },
          primaryGuest: t('bookingSteps_step3_booker_primaryGuest'),
          guest: t('bookingSteps_step3_booker_guest'),
          information: t('bookingSteps_step3_booker_information'),
          buttonText: {
            add: t('bookingSteps_step3_booker_buttonText_add'),
            descrement: t('bookingSteps_step3_booker_buttonText_descrement'),
          },
        },
        address: {
          title: t('bookingSteps_step3_address_title'),
          placeholder: {
            street: t('bookingSteps_step3_address_placeholder_street'),
            postalCode: t('bookingSteps_step3_address_placeholder_postalCode'),
            country: t('bookingSteps_step3_address_placeholder_country'),
            province: t('bookingSteps_step3_address_placeholder_province'),
          },
        },
        note: t('bookingSteps_step3_note'),
        payment: {
          title: t('bookingSteps_step3_payment_title'),
          select: {
            label: t('bookingSteps_step3_payment_select_label'),
            placeholder: t('bookingSteps_step3_payment_select_placeholder'),
          },
        },
        acceptCheckbox: t('bookingSteps_step3_acceptCheckbox'),
        notice_1: {
          title: t('bookingSteps_step3_notice_1_title'),
          description: t('bookingSteps_step3_notice_1_description'),
        },
        notice_2: {
          title: t('bookingSteps_step3_notice_2_title'),
          description: t('bookingSteps_step3_notice_2_description'),
        },
        buttonText: {
          previous: t('bookingSteps_step3_buttonText_previous'),
          next: t('bookingSteps_step3_buttonText_next'),
        },
        popupBooking: {
          title: t('bookingSteps_step3_popupBooking_title'),
          description: t('bookingSteps_step3_popupBooking_description'),
          notFound: t('bookingSteps_step3_popupBooking_notFound'),
          serverError: t('bookingSteps_step3_popupBooking_serverError'),
          sucessBooking: t('bookingSteps_step3_popupBooking_sucessBooking'),
          sucessReservation: t('bookingSteps_step3_popupBooking_sucessReservation'),
          'getFoliostFail ': t('bookingSteps_step3_popupBooking_getFoliostFail '),
        },
      },
      step4: {
        title: t('bookingSteps_step4_title'),
        buttonText: {
          previous: t('bookingSteps_step4_buttonText_previous'),
          next: t('bookingSteps_step4_buttonText_next'),
        },
        stayInfo: {
          title: t('bookingSteps_step4_stayInfo_title'),
          unit: {
            night: t('bookingSteps_step4_stayInfo_unit_night'),
            adults: t('bookingSteps_step4_stayInfo_unit_adults'),
            childrens: t('bookingSteps_step4_stayInfo_unit_childrens'),
          },
        },
        roomsAndOffersInfo: {
          title: t('bookingSteps_step4_roomsAndOffersInfo_title'),
          offersAndRooms: t('bookingSteps_step4_roomsAndOffersInfo_offersAndRooms'),
          addons: t('bookingSteps_step4_roomsAndOffersInfo_addons'),
          included: t('bookingSteps_step4_roomsAndOffersInfo_included'),
          services: t('bookingSteps_step4_roomsAndOffersInfo_services'),
          notice: t('bookingSteps_step4_roomsAndOffersInfo_notice'),
          buttonText: t('bookingSteps_step4_roomsAndOffersInfo_buttonText'),
          discount: t('bookingSteps_step4_roomsAndOffersInfo_discount'),
          apply: t('bookingSteps_step4_roomsAndOffersInfo_apply'),
          arrival: t('bookingSteps_step4_roomsAndOffersInfo_arrival'),
          daily: t('bookingSteps_step4_roomsAndOffersInfo_daily'),
          departure: t('bookingSteps_step4_roomsAndOffersInfo_departure'),
        },
        popupBooking: {
          title: t('bookingSteps_step4_popupBooking_title'),
          bookingId: t('bookingSteps_step4_popupBooking_bookingId'),
          amount: t('bookingSteps_step4_popupBooking_balance'),
          description: t('bookingSteps_step4_popupBooking_description'),
          fail: t('bookingSteps_step4_popupBooking_fail'),
          serverError: t('bookingSteps_step4_popupBooking_serverError'),
          sucessPayment: t('bookingSteps_step4_popupBooking_sucessPayment'),
          payMessage: t('bookingSteps_step4_popupBooking_payMessage'),
          CannotPayMore: t('bookingSteps_step4_popupBooking_CannotPayMore'),
          getLinkFail: t('bookingSteps_step4_popupBooking_getLinkFail'),
          buttonText: {
            payment: t('bookingSteps_step4_popupBooking_buttonText_payment'),
            next: t('bookingSteps_step4_popupBooking_buttonText_next'),
            retry: t('bookingSteps_step4_popupBooking_buttonText_retry'),
          },
        },
      },
    },
    thankYouPage: {
      title: t('thankYouPage_title'),
      content: {
        bookingID: t('thankYouPage_content_bookingID'),
        email: t('thankYouPage_content_email'),
        download: t('thankYouPage_content_download'),
      },
      buttonText: {
        download: t('thankYouPage_buttonText_download'),
        home: t('thankYouPage_buttonText_home'),
        contact: t('thankYouPage_buttonText_contact'),
      },
      help: t('thankYouPage_help'),
    },
    contactPage: {
      title: t('contactPage_title'),
      contentDearGuests: t('contactPage_contentDearGuests'),
      contentLookForward: t('contactPage_contentLookForward'),
      contactInfo: {
        title: t('contactPage_contactInfo_title'),
        phoneNumber: t('contactPage_contactInfo_phoneNumber'),
        email: t('contactPage_contactInfo_email'),
        openWorkWeekdays: t('contactPage_contactInfo_openWorkWeekdays'),
        openWorkWeekends: t('contactPage_contactInfo_openWorkWeekends'),
      },
      contactForm: {
        personalInfo: t('contactPage_contactForm_personalInfo'),
        travelData: t('contactPage_contactForm_travelData'),
        note: t('contactPage_contactForm_note'),
        sunHotel: t('contactPage_contactForm_sunHotel'),
        buttonText: {
          addHotel: t('contactPage_contactForm_buttonText_addHotel'),
          submit: t('contactPage_contactForm_buttonText_submit'),
          ok: t('contactPage_contactForm_buttonText_ok'),
        },
        placeholder: {
          name: t('contactPage_contactForm_placeholder_name'),
          email: t('contactPage_contactForm_placeholder_email'),
          hotel: t('contactPage_contactForm_placeholder_hotel'),
          guest: t('contactPage_contactForm_placeholder_guest'),
          arriveDate: t('contactPage_contactForm_placeholder_arriveDate'),
          departureDate: t('contactPage_contactForm_placeholder_departureDate'),
        },
        popupSuccess: {
          title: t('contactPage_contactForm_popupSuccess_title'),
          description: t('contactPage_contactForm_popupSuccess_description'),
        },
        popupFailure: {
          title: t('contactPage_contactForm_popupFailure_title'),
        },
      },
    },
    searchMenu: {
      location: {
        title: t('searchMenu_location_title'),
        placeholder: t('searchMenu_location_placeholder'),
      },
      calendar: {
        title: t('searchMenu_calendar_title'),
        arrivalPlaceHolder: t('searchMenu_calendar_arrivalPlaceHolder'),
        departurePlaceHolder: t('searchMenu_calendar_departurePlaceHolder'),
        calendarDescription: t('searchMenu_calendar_calendarDescription'),
        calendarLow: t('searchMenu_calendar_calendarLow'),
        calendarNormal: t('searchMenu_calendar_calendarNormal'),
        calendarHigh: t('searchMenu_calendar_calendarHigh'),
      },
      guestAndRoom: {
        title: t('searchMenu_guestAndRoom_title'),
        room: t('searchMenu_guestAndRoom_room'),
        guest: t('searchMenu_guestAndRoom_guest'),
        adults: t('searchMenu_guestAndRoom_adults'),
        children: t('searchMenu_guestAndRoom_children'),
        years: t('searchMenu_guestAndRoom_years'),
        guestAge: t('searchMenu_guestAndRoom_guestAge'),
        childrenAge: t('searchMenu_guestAndRoom_childrenAge'),
        totalGuest: t('searchMenu_guestAndRoom_totalGuest'),
      },
    },
    banner: {
      holidayPackages: t('banner_holidayPackages'),
      welcome: t('banner_welcome'),
    },
    country1_title: t('country1_title'),
    country2_title: t('country2_title'),
    errorPage: {
      notFound: {
        type: t('errorPage_notFound_type'),
        message: t('errorPage_notFound_message'),
      },
    },
    vouchers: {
      step1: {
        title: t('vouchers_step1_title'),
      },
      step2: {
        title: t('vouchers_step2_title'),
      },
      step3: {
        title: t('vouchers_step3_title'),
      },
      step4: {
        title: t('vouchers_step4_title'),
      },
    },
    offer:{
      greeting: t('offer_greeting'),
      specialtext: t('offer_specialtext'),
      invoice: {
        total: t('offer_invoice_total'),
        discount: t('offer_invoice_discount'),
        valid: t('offer_invoice_valid')
      },

    }
  };

  // check key and return value
  const keys = key.split('.');
  const reducer = (currentValue: any, currentKey: string) => {
    if (!currentValue[currentKey]) {
      return 'invalid key';
    }
    return currentValue[currentKey];
  };
  return keys.reduce(reducer, translatedData);
}
