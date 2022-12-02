<template>
  <!-- SIDEBAR MENU CONTENT -->
  <div class="relative mt-6 flex-1 px-4 sm:px-6">
    <!-- END SAVED SETTINGS DIVIDER -->

    <!-- BOT SETTINGS DIVIDER -->
    <div class="relative mt-6 mb-2">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-start">
        <span class="pr-2 bg-white text-xs uppercase font-bold">
          Bot Settings
        </span>
      </div>
    </div>
    <!-- END BOT SETTINGS DIVIDER -->

    <!-- BOT SETTINGS OPTIONS -->
    <div class="space-y-2">
      <!-- NAME INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="name"
          class="block text-xs font-medium text-gray-900"
        >Demo Name</label>
        <input
          id="background"
          v-model="name"
          type="text"
          name="name"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Acme ABM"
        >
      </div>
      <!-- COLOR SELECTION-->
      <div
        class="
          flex
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="color"
          class="w-3/4 text-xs font-medium text-gray-900"
        >Bot Color</label>
        <input
          id="color"
          v-model="color"
          type="color"
          name="color"
          class="
            w-1/4
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
        >
      </div>
      <!-- BACKGROUND INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="background"
          class="block text-xs font-medium text-gray-900"
        >Background</label>
        <input
          id="background"
          v-model="background"
          type="text"
          name="background"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Insert website or path to hosted image"
          value="https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__cd817069080e.png"
        >
      </div>
      <!-- PLAYBOOK DROPDOWN-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="playbookType"
          class="block text-xs font-medium text-gray-900"
        >Playbook
          <span v-if="interactionId" class="opacity-50">//</span>
          {{ interactionId }}</label>
        <select
          id="playbookType"
          v-model="playbookType"
          type="text"
          name="playbookType"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Select a Playbook"
          @change="loadWidgetId($event)"
        >
          <option value="Engage All">
            Engage All
          </option>
          <option value="ABM Bot">
            ABM Bot
          </option>
          <option value="Support Bot">
            Support Bot
          </option>
          <option value="Skip the Form">
            Skip the Form
          </option>
          <option value="Fastlane">
            Fastlane
          </option>
          <option value="ConvoAI Bot">
            ConvoAI Bot
          </option>
          <!--
                      <option value="Return Bot">
                        Return Bot
                      </option>
                       -->
          <option value="Custom Bot">
            Custom Bot
          </option>
        </select>
      </div>
      <!-- ABM Message -->
      <div
        v-if="playbookType === 'ABM Bot'"
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="abmMessage"
          class="block text-xs font-medium text-gray-900"
        >ABM Message</label>
        <input
          id="abmMessage"
          v-model="abmMessage"
          type="text"
          name="abmMessage"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
        >
      </div>
      <!-- WIDGET ID -->
      <div
        v-if="playbookType === 'Custom Bot'"
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="widgetId"
          class="block text-xs font-medium text-gray-900"
        >Widget ID</label>
        <input
          id="widgetId"
          v-model="widgetId"
          type="text"
          name="widgetId"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
        >
      </div>
      <!-- TARGETING CONDITION -->
      <div
        v-if="playbookType === 'Custom Bot'"
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="targetingCondition"
          class="block text-xs font-medium text-gray-900 flex flex-wrap relative"
        >
          <div>Targeting Condition</div> &nbsp;&nbsp;
          <div>
            <a
              tabindex="0"
              class="flex bg-drift-grey px-1 text-white font-xxs rounded shadow-md hover:bg-drift-orange hover:shadow-lg focus:bg-drift-orange focus:shadow-lg focus:outline-none focus:ring-0 active:bg-drift-orange active:shadow-lg transition duration-150 ease-in-out"
              role="button"
              title="Targeting Help"
              @click="toggleTooltip()"
            >?</a>
          </div>
          <div v-if="tooltipVis" class="absolute top-5 z-50 font-medium text-sm bg-drift-black text-white rounded shadow-md py-2 px-3">
            In your Drift playbook, use the targeting condition of <i>"Cookie CONTAINS playbook=<span class="text-drift-orange">target</span>"</i> &mdash; everything after the equal sign (orange in our example) will go in this box!
          </div>
        </label>
        <input
          id="targetingCondition"
          v-model="targetingCondition"
          type="text"
          name="targetingCondition"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
        >
      </div>
    </div>
    <!-- END BOT SETTINGS OPTIONS -->

    <!-- NOTIFICATION SETTINGS DIVIDER -->
    <div class="relative mt-6 mb-2">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-start">
        <span class="pr-2 bg-white text-xs uppercase font-bold">
          Notification Settings
        </span>
      </div>
    </div>
    <!-- END NOTIFICATION SETTINGS DIVIDER -->

    <!-- NOTIFICATION DROPDOWN-->
    <div
      class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
    >
      <label
        for="notificationType"
        class="block text-xs font-medium text-gray-900"
      >Notification Type</label>
      <select
        id="notificationType"
        v-model="notificationType"
        type="text"
        name="notificationType"
        class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
        placeholder="Select a Notification Type"
      >
        <option value="Salesforce_Desktop">
          Salesforce Desktop
        </option>
        <option value="Salesloft_Desktop">
          Salesloft Desktop
        </option>
        <option value="Outreach_Desktop">
          Outreach Desktop
        </option>
      </select>
    </div>

    <!-- USER SETTINGS DIVIDER -->
    <div class="relative mt-6 mb-2">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-start">
        <span class="pr-2 bg-white text-xs uppercase font-bold">
          User Settings
        </span>
      </div>
    </div>
    <!-- END USER SETTINGS DIVIDER -->

    <!-- USER SETTINGS OPTIONS -->
    <div class="space-y-2">
      <!-- FIRST NAME INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="fname"
          class="block text-xs font-medium text-gray-900"
        >First Name</label>
        <input
          id="fname"
          v-model="firstName"
          type="text"
          name="fname"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Jane"
        >
      </div>
      <!-- LAST NAME INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="lname"
          class="block text-xs font-medium text-gray-900"
        >Last Name</label>
        <input
          id="lname"
          v-model="lastName"
          type="text"
          name="lname"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Johnson"
        >
      </div>
      <!-- EMAIL INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="email"
          class="block text-xs font-medium text-gray-900"
        >Email</label>
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Jane.Doe@example.com"
        >
      </div>
      <!-- ACCOUNT INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="account"
          class="block text-xs font-medium text-gray-900"
        >Account</label>
        <input
          id="account"
          v-model="accountName"
          type="text"
          name="account"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="Example Inc"
        >
      </div>
    </div>

    <!-- SAVE BUTTON -->
    <button
      type="button"
      class="
        mt-6
        w-full
        items-center
        px-6
        py-3
        border border-transparent
        rounded-md
        shadow-sm
        transition
        bg-drift-lime
        hover:bg-drift-cyan
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-drift-indigo
        font-bold
        uppercase
      "
      @click="updateDemo()"
    >
      ⚡️ Save
    </button>

    <!-- ACTIVATE BUTTON -->
    <button
      type="button"
      class="
        mt-6
        w-full
        items-center
        px-6
        py-3
        border border-transparent
        rounded-md
        shadow-sm
        transition
        bg-drift-lime
        hover:bg-drift-cyan
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-drift-indigo
        font-bold
        uppercase
      "
      @click="activateDemo()"
    >
      🐐 Activate
    </button>

    <!-- DELETE BUTTON -->
    <button
      type="button"
      class="
        mt-6
        w-full
        items-center
        px-6
        py-3
        border border-transparent
        rounded-md
        shadow-sm
        transition
        bg-red-400
        hover:bg-red-600
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-drift-indigo
        font-bold
        uppercase
      "
      @click="deleteDemo()"
    >
      🗑 Delete
    </button>

    <!-- END OF SIDEBAR MENU CONTENT -->
  </div>
</template>

<script>
export default {
  name: 'TheDemoMenu',
  data () {
    return {
      name: this.$store.getters['demos/getSelected'].name,
      email: this.$store.getters['demos/getSelected'].settings?.email,
      firstName: this.$store.getters['demos/getSelected'].settings?.firstName,
      lastName: this.$store.getters['demos/getSelected'].settings?.lastName,
      abmMessage: this.$store.getters['demos/getSelected'].settings?.abmMessage,
      accountName: this.$store.getters['demos/getSelected'].settings?.accountName,
      playbookType: this.$store.getters['demos/getSelected'].settings?.playbookType,
      interactionId: this.$store.getters['demos/getSelected'].settings?.interactionId,
      color: this.$store.getters['demos/getSelected'].settings?.color,
      background: this.$store.getters['demos/getSelected'].settings?.background,
      widgetId: this.$store.getters['demos/getSelected'].settings?.widgetId,
      targetingCondition: this.$store.getters['demos/getSelected'].settings?.targetingCondition,
      notificationType: this.$store.getters['demos/getSelected'].settings?.notificationType || 'Salesforce_Desktop',
      tooltipVis: false
    }
  },
  computed: {
  },
  methods: {
    loadWidgetId (event) {
      if (event.target.value === 'Custom Bot' && !this.widgetId) {
        this.widgetId = this.$store.getters['user/getWidget']
      }
    },
    toggleTooltip () {
      this.tooltipVis = !this.tooltipVis
    },
    async updateDemo () {
      try {
        await this.$store.dispatch('demos/update', {
          name: this.name,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          abmMessage: this.abmMessage,
          accountName: this.accountName,
          playbookType: this.playbookType,
          interactionId: this.interactionId,
          color: this.color,
          background: this.background,
          widgetId: this.widgetId,
          targetingCondition: this.targetingCondition,
          notificationType: this.notificationType
        })
        // TODO: Add a toast success alert
      } catch (err) {
        // TODO: Add a toast failure alert
      }
    },
    async deleteDemo () {
      try {
        await this.$store.dispatch('demos/delete')
      } catch (err) {}
    },
    async activateDemo () {
      this.updateDemo()
      await this.$store.dispatch('demos/activate')
    }
  }
}
</script>
