import {createSkill, createSkeletonSkill, createPopover} from './viewSkills';

describe('viewSkills templates', () => {
  it('creates skeleton skills', () => {
    const html = createSkeletonSkill();
    expect(html).toContain('animate-pulse');
  });

  it('includes popover target when cert link exists', () => {
    const svg = '<svg><path /></svg>';
    const html = createSkill({id: 1, name: 'JS', icon: svg, cert_link: 'http'});
    expect(html).toContain('data-popover-target');
    expect(html).toContain('<svg>');
  });

  it('falls back to default svg when icon missing', () => {
    const html = createSkill({id: 2, name: 'NoIcon'});
    expect(html).toContain('viewBox="0 0 640 640"');
  });

  it('renders popover body', () => {
    const html = createPopover({id: 2, cert_link: 'http', cert_img: 'img', cert_desc: 'desc'});
    expect(html).toContain('popover-target-2');
    expect(html).toContain('desc');
  });

  it('handles popover without link or image', () => {
    const html = createPopover({id: 3, cert_link: '', cert_img: '', cert_desc: 'No asset'});
    expect(html).toContain('popover-target-3');
    expect(html).not.toContain('href=');
    expect(html).not.toContain('lazyload');
  });
});
