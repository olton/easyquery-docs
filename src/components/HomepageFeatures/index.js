import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'EASY.QUERY',
    Svg: require('@site/static/img/easy-query.svg').default,
    description: (
      <>
          Long story short, EasyQuery will be useful to you if you are creating a .NET application that works with a database.
          <br/>
          <br/>
          <div className={styles.buttons}>
              <Link
                  className="button button--secondary button--lg"
                  to="/easyquery/intro">
                  Read docs
              </Link>
          </div>
      </>
    ),
  },
  {
    title: 'EASY.REPORT',
    Svg: require('@site/static/img/easy-report.svg').default,
    description: (
      <>
          ASP.NET Core solution template for ad-hoc reporting (ERSK). Don't build everything from scratch. Use ERSK as the starting point!
          <br/>
          <br/>
          <div className={styles.buttons}>
              <Link
                  className="button button--secondary button--lg"
                  to="/easyreport/intro">
                  Read docs
              </Link>
          </div>
      </>
    ),
  },
  {
    title: 'LOCALIZER',
    Svg: require('@site/static/img/localizer.svg').default,
    description: (
      <>
          Delphi wizards and components which make your applications really multilingual and helps you to translate your programs to other languages.
          <br/>
          <br/>
          <div className={styles.buttons}>
              <Link
                  className="button button--secondary button--lg"
                  to="/localizer/intro">
                  Read docs
              </Link>
          </div>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
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

export default function HomepageFeatures() {
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
