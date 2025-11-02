import React, { useState } from "react";
import { useParams } from "react-router-dom";

type Section = {
  title: string;
  html: string;
  images?: string[];
};

type Project = {
  title: string;
  subtitle?: string;
  links?: { label: string; url: string }[];
  bibtex?: string;
  members: { name: string; image: string }[];
  sections: Section[];
};

const projectData: Record<string, Project> = {
  limao: {
    title: "LIMAO: A Framework for Lifelong Modular Learned Query Optimization",
    subtitle: "Addressing catastrophic forgetting in dynamic workloads",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2507.00188" },
    ],
    bibtex: `@article{10.14778/3749646.3749712,
author = {Zhang, Qihan and Xie, Shaolin and Sabek, Ibrahim},
title = {LIMAO: A Framework for Lifelong Modular Learned Query Optimization},
year = {2025},
issue_date = {July 2025},
publisher = {VLDB Endowment},
volume = {18},
number = {11},
issn = {2150-8097},
url = {https://doi.org/10.14778/3749646.3749712},
doi = {10.14778/3749646.3749712},
abstract = {Query optimizers are crucial for the performance of database systems. Recently, many learned query optimizers (LQOs) have demonstrated significant performance improvements over traditional optimizers. However, most of them operate under a limited assumption: a static query environment. This limitation prevents them from effectively handling complex, dynamic query environments in real-world scenarios. Extensive retraining can lead to the well-known catastrophic forgetting problem which reduces the LQO generalizability over time. In this paper, we address this limitation and introduce LIMAO (Lifelong Modular Learned Query Optimizer), a framework for lifelong learning of plan cost prediction that can be seamlessly integrated into existing LQOs. LIMAO leverages a modular lifelong learning technique, an attention-based neural network composition architecture, and an efficient training paradigm designed to retain prior knowledge while continuously adapting to new environments. We implement LIMAO in two LQOs, showing that our approach is agnostic to underlying engines. Experimental results show that LIMAO significantly enhances the performance of LQOs, achieving up to a 40\% improvement in query execution time and reducing the variance of execution time by up to 60\% under dynamic workloads. By leveraging a precise and self-consistent design, LIMAO effectively mitigates catastrophic forgetting, ensuring stable and reliable plan quality over time. Compared to Postgres, LIMAO achieves up to a 4\texttimes{} speedup on selected benchmarks, highlighting its practical advantages in real-world query optimization.},
journal = {Proc. VLDB Endow.},
month = sep,
pages = {4546–4559},
numpages = {14}
}`,
    members: [
      { name: "Qihan Zhang", image: "/people_photos/qihan-photo.jpg" },
      { name: "Shaolin Xie", image: "/people_photos/shelly-photo.jpg" },
    ],
    sections: [
      {
        title: "Description",
        html: `
        In traditional database systems, query optimizers play an important role in ensuring efficient query execution. Recently, learned query optimizers (LQOs) have shown promising improvements over traditional ones. However, most existing LQOs assume a static query environment (or limited dynamic environments), which limits their ability to handle real-world scenarios where queries and workloads change dynamically. This limitation leads to performance degradation over time, as frequent retraining can cause the model to forget previously learned knowledge, a problem known as catastrophic forgetting. In this research, we propose a novel approach to address this issue.
`,
      },
    ],
  },


  reliable_LQO: {
    title: "Reliable Learned Query Optimizers",
    subtitle: "Conformal Predictions for LQOs",
    links: [
      { label: "Paper", url: "https://www.vldb.org/pvldb/vol18/p2653-liu.pdf" },
      { label: "Code", url: "https://github.com/ihanwen99/Conformal-Prediction-for-Verifiable-Learned-Query-Optimization/" },
    ],
    bibtex: `@article{10.14778/3742728.3742755,
author = {Liu, Hanwen and Giridhara, Shashank and Sabek, Ibrahim},
title = {Conformal Prediction for Verifiable Learned Query Optimization},
year = {2025},
issue_date = {April 2025},
publisher = {VLDB Endowment},
volume = {18},
number = {8},
issn = {2150-8097},
url = {https://doi.org/10.14778/3742728.3742755},
doi = {10.14778/3742728.3742755},
abstract = {Query optimization is critical in relational databases. Recently, numerous Learned Query Optimizers (LQOs) have been proposed, demonstrating superior performance over traditional hand-crafted query optimizers after short training periods. However, the opacity and instability of machine learning models have limited their practical applications. To address this issue, we are the first to formulate the LQO verification as a Conformal Prediction (CP) problem. We first construct a CP model and obtain user-controlled bounded ranges for the actual latency of LQO plans before execution. Then, we introduce CP-based runtime verification along with violation handling to ensure performance prior to execution. For both scenarios, we further extend our framework to handle distribution shifts in the dynamic environment using adaptive CP approaches. Finally, we present CP-guided plan search, which uses actual latency upper bounds from CP to heuristically guide query plan construction. We integrated our verification framework into three LQOs (Balsa, Lero, and RTOS) and conducted evaluations on several workloads. Experimental results demonstrate that our method is both accurate and efficient. Our CP-based approaches achieve tight upper bounds, reliably detect and handle violations. Adaptive CP maintains accurate confidence levels even in the presence of distribution shifts, and the CP-guided plan search improves both query plan quality (up to 9.84x) and planning time, with a reduction of up to 74.4\% for a single query and 9.96\% across all test queries from trained LQOs.},
journal = {Proc. VLDB Endow.},
month = sep,
pages = {2653–2666},
numpages = {14}
}`,
    members: [
      { name: "Hanwen Liu", image: "/people_photos/hanwen.jpeg" },
      { name: "Shashank Giridhara", image: "/people_photos/shashank-picture.png" },
    ],
    sections: [
      {
        title: "Overview",
        html: `
Query optimization is critical in relational databases. Recently, numerous Learned Query Optimizers (LQOs) have been proposed, demonstrating superior performance over traditional hand-crafted query optimizers after short training periods. However, the opacity and instability of machine learning models have limited their practical applications. To address this issue, we are the first to formulate the LQO verification as a Conformal Prediction (CP) problem. We first construct the CP model and obtain user-controlled bounded ranges for the actual latency of LQO plans before execution. Then, we introduce CP-based runtime verification along with violation handling to ensure performance prior to execution. For both scenarios, we further extend our framework to handle distribution shifts in the dynamic environment using adaptive CP approaches. Finally, we present CP-guided plan search, which uses actual latency upper bounds from CP to heuristically guide query plan construction. We integrated our verification framework into three LQOs (Balsa, Lero, and RTOS) and conducted evaluations on the JOB and TPC-H workloads. Experimental results demonstrate that our method is both accurate and efficient. Our CP-based approaches achieve tight upper bounds, reliably detect and handle violations. Adaptive CP maintains accurate confidence levels even in the presence of distribution shifts, and the CP-guided plan search improves both query plan quality (up to 9.84x) and planning time, with a reduction of up to 74.4% for a single query and 9.96% across all test queries from trained LQOs.
        `,
      },
    ],
  },



  data2insights: {
    title: "Data to Insights",
    // subtitle: "Transforming raw data into actionable intelligence",
    members: [
      { name: "Shaolin Xie", image: "/people_photos/shelly-photo.jpg" },
    ],
    sections: [
      {
        title: "Overview",
        html: `In today’s data-driven world, organizations collect massive amounts of structured information, 
        yet most of it remains underutilized. Extracting meaningful insights from databases typically requires 
        expert knowledge of SQL, statistics, and domain-specific analysis - a process that’s slow, manual, 
        and error-prone. Business users often face a simple but frustrating question: “I have the data, but 
        what does it actually tell me?” This project addresses that gap by creating an intelligent, multi-agent 
        system powered by large language models (LLMs) that can autonomously explore any database, generate analytical 
        queries, and translate raw numbers into actionable insights without human intervention.

        <p>[Research in progress...]</p>`,
      },
    ],
    bibtex: ``,
  },




  secure_db: {
    title: "Secure Database Systems",
    subtitle: "Enhancing privacy, security, and efficiency in database management",
    links: [
      // { label: "Paper", url: "#" },
      // { label: "Code", url: "#" },
    ],
    bibtex: ``,
    members: [
      { name: "Qihan Zhang", image: "/people_photos/qihan-photo.jpg" },
    ],
    sections: [],
  },
};

export const ProjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const project = id ? projectData[id] : undefined;
  const [copied, setCopied] = useState(false);

  if (!project) {
    return <div className="text-center text-red-500 py-20">Project not found.</div>;
  }

  const handleCopy = async () => {
    if (!project.bibtex) return;
    try {
      await navigator.clipboard.writeText(project.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-[1200] mx-auto px-6 py-12 space-y-12">
      {/* Title and Resources */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        {project.subtitle && (
          <p className="text-lg text-gray-600">{project.subtitle}</p>
        )}
        {project.links && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Sections */}
      {project.sections.map((sec, i) => (
        <section key={i} className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-1 border-gray-200">
            {sec.title}
          </h2>

          {/* Section text */}
          <div
            className="prose prose-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: sec.html }}
          />

          {/* Section images */}
          {sec.images && sec.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {sec.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${sec.title} figure ${idx + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </section>
      ))}

      {/* BibTeX */}
      {project.bibtex && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-1 border-gray-200">
            BibTeX
          </h2>
          <div className="relative bg-[#f6f8fa] border border-gray-200 rounded-lg p-4">
            <button
              onClick={handleCopy}
              className="absolute top-2 right-3 text-xs px-2 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <pre className="overflow-x-auto text-sm text-gray-800 font-mono whitespace-pre leading-relaxed">
              <code>{project.bibtex}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Members */}
      {project.members.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-1 border-gray-200">
            People
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {project.members.map((member, i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 object-cover rounded-full shadow-md"
                />
                <p className="mt-3 text-gray-800 font-medium">{member.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
