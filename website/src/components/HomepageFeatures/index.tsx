import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
    id: string;
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        id: 'easy-to-use',
        title: 'Easy to Use',
        Svg: require('@site/static/img/easy_to_use.svg').default,
        description: (
            <>
                SUI-JS was designed from the ground up to be easily used to get
                your application up and running quickly.
            </>
        ),
    },
    {
        id: 'business-logic',
        title: 'Focus on Business Logic',
        Svg: require('@site/static/img/business_logic.svg').default,
        description: (
            <>
                SUI-JS lets you focus on your code, and we&apos;ll do the
                chores. Go ahead and move your business logic into the{' '}
                <code>services</code>.
            </>
        ),
    },
    {
        id: 'typescript',
        title: 'Powered by TypeScript',
        Svg: require('@site/static/img/typescript.svg').default,
        description: (
            <>
                Extend or customize your layout by reusing class components.
                SUI-JS can be extended while reusing the same functions.
            </>
        ),
    },
    {
        id: 'jetbrains',
        title: 'JetBrains Support',
        Svg: require('@site/static/img/jb_beam.svg').default,
        description: (
            <>
                JetBrains supports non-commercial open-source projects by
                providing core project contributors with a set of best-in-class
                developer tools free of charge.{' '}
                <a href="https://jb.gg/OpenSourceSupport" target="_blanck">
                    JetBrains for Open Source development
                </a>
            </>
        ),
    },
];

function Feature({ title, Svg, description }: Readonly<FeatureItem>) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} />
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
                    {FeatureList.map((props) => (
                        <Feature key={props.id} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
