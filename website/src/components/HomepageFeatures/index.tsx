import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy_to_use.svg').default,
    description: (
      <>
        SUI-JS was designed from the ground up to be easily
        used to get your application up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on Business Logic',
    Svg: require('@site/static/img/business_logic.svg').default,
    description: (
      <>
        SUI-JS lets you focus on your code, and we&apos;ll do the chores. Go
        ahead and move your business logic into the <code>services</code>.
      </>
    ),
  },
  {
    title: 'Powered by TypeScript',
    Svg: require('@site/static/img/typescript.svg').default,
    description: (
      <>
        Extend or customize your layout by reusing class components. SUI-JS can
        be extended while reusing the same functions.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
