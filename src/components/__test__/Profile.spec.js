import { describe, it, expect } from 'vitest'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import { mount } from '@vue/test-utils'

describe("ProfileInfo.vue", () => {
  const wrapper = mount(ProfileInfo)
  it("By default the page name should be: My Profile", () => {
    expect(wrapper.html()).toContain('Profile Info')
  })
})
