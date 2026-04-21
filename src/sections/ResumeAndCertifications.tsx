import React from "react";
import { certifications, resumeFile } from "../constants";
import TitleHeader from "../components/TitleHeader";
import type { Certification } from "../constants/types";
import { Download, ExternalLink } from "lucide-react";
import OptimizedImage from "../components/OptimizedImage";

const ResumeAndCertifications: React.FC = () => {
  return (
    <section id="resume" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Resume & Certifications"
          sub="Verified professional credentials"
        />

        {/* Resume Download Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <a
            href={resumeFile}
            download
            className="group card-border block p-7 transition-all duration-300 hover:border-white/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Download Resume</h3>
                  <p className="text-white-50 text-sm">PDF • Updated Jan 2026</p>
                </div>
              </div>
              <div className="text-white-50 group-hover:translate-x-1 transition-transform">
                <ExternalLink className="w-6 h-6" />
              </div>
            </div>
          </a>
        </div>

        {/* Certifications Grid */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Certifications</h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {certifications.map((cert: Certification, index: number) => (
              <div key={index} className="card-border p-5 break-inside-avoid-column">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-white/5">
                      <OptimizedImage
                        src={cert.imgPath}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-white-50 text-sm">{cert.issuer}</p>
                      <p className="text-white-50 text-xs mt-1">{cert.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white-50 text-sm font-medium">
                      <span>View Credential</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeAndCertifications;
